'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextProps {
  activeView: string;
  updateActiveView: (viewKey: string) => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [activeView, setActiveView] = useState('');

  const updateActiveView = (viewKey: string) => {
    setActiveView(viewKey);
  };

  return (
    <SidebarContext.Provider value={{ activeView, updateActiveView }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};
