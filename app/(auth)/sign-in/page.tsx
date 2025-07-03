import AuthForm from '@/components/auth/AuthForm';
import React from 'react';

export const metadata = {
  title: 'Sign In | Widget UI Kit',
  description: 'Access your account and explore all features',
};

const SignIn = () => {
  return <AuthForm type="sign-in" />;
};

export default SignIn;
