import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AuthForm from '@/components/auth/AuthForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sign In | Widget UI Kit',
  description: 'Access your account and explore all features',
};

const SignIn = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/widget-customizer/my-widgets');
  }

  return <AuthForm type="sign-in" />;
};

export default SignIn;
