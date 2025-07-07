'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface SessionProviderWrapperProps {
  children: React.ReactNode;
  session: Session | null;
}

const SessionProviderWrapper = ({
  children,
  session,
}: SessionProviderWrapperProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
