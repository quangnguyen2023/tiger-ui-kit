import { apiSignUp } from '@/api/auth';
import { PATH_WIDGET_CUSTOMIZER } from '@/constants';
import { SignUpCredentials } from '@/types/auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useAuthForm = () => {
  const { push } = useRouter();

  const handleSignIn = async (values: Record<string, any>) => {
    const result = await signIn('credentials', {
      ...values,
      redirect: false,
    });

    if (result?.ok) {
      push(PATH_WIDGET_CUSTOMIZER);
    } else {
      toast.error('Sign in failed', {
        description: 'Please check your email and password',
      });
    }
  };

  const handleSignUp = async (values: SignUpCredentials) => {
    const result = await apiSignUp(values);

    if (result?.success) {
      push('/sign-in');
    } else {
      toast.error('Sign Up failed', {
        description: 'Please try again',
      });
    }
  };

  return { handleSignIn, handleSignUp };
};
