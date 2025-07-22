import AuthForm from '@/components/auth/AuthForm';

export const metadata = {
  title: 'Sign In | Widget UI Kit',
  description: 'Access your account and explore all features',
};

const SignIn = async () => {
  return <AuthForm type="sign-in" />;
};

export default SignIn;
