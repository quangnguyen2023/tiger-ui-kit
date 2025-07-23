import { Button } from '@/components/ui/button';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { signIn } from 'next-auth/react';
import { SetStateAction } from 'react';

type SocialLoginProps = {
  loadingProvider: string | null;
  setLoadingProvider: React.Dispatch<SetStateAction<string | null>>;
};

export function SocialLogin({
  loadingProvider,
  setLoadingProvider,
}: SocialLoginProps) {
  const handleLogin = (provider: string) => {
    setLoadingProvider(provider);
    signIn(provider, {}, { prompt: 'select_account' });
  };

  return (
    <Button
      variant="outline"
      onClick={() => handleLogin('google')}
      className="h-12 border-gray-300 w-full"
      disabled={!!loadingProvider}
      loading={loadingProvider === 'google'}
      startIcon={<GoogleIcon className="mr-1" width={22} height={22} />}
    >
      Continue with Google
    </Button>
  );
}
