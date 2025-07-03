import React, { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex items-center justify-center p-12 m-3 mr-0 border rounded-xl bg-[#f1f0ec] bg-[url(/login.png)] bg-contain bg-center" />
      {/* Right side - Login Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-xs">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
