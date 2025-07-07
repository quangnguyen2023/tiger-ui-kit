import { Button } from '@/components/ui/button';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { signIn } from 'next-auth/react';

export function SocialLogin() {
  const handleGoogleLogin = () => {
    signIn('google');
  };

  return (
    <div>
      <Button
        variant="outline"
        onClick={handleGoogleLogin}
        className="h-12 border-gray-300 w-full"
      >
        <GoogleIcon className="mr-1" width={30} height={30} />
        Google
      </Button>
    </div>
  );
}
