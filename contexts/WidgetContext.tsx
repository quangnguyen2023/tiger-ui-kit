'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface WidgetContextType {
  selectedWidget: string | null;
  setSelectedWidget: Dispatch<SetStateAction<string | null>>;
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

export function useWidgetContext() {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidgetContext must be used within a WidgetProvider');
  }
  return context;
}

export function WidgetProvider({ children }: { children: React.ReactNode }) {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  return (
    <WidgetContext.Provider value={{ selectedWidget, setSelectedWidget }}>
      {children}
    </WidgetContext.Provider>
  );
}
