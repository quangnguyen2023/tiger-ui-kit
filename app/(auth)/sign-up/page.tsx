import AuthForm from '@/components/auth/AuthForm';
import React from 'react';

export const metadata = {
  title: 'Sign Up | Widget UI Kit',
  description: 'Access your account and explore all features',
};

const SignUp = () => {
  return <AuthForm type="sign-up" />;
};

export default SignUp;
