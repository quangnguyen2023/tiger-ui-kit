'use client';

import { getExistingWidgets } from '@/api/widget';
import useWidgetActions from '@/hooks/useWidgetActions';
import { Widget } from '@/types/widget';
import { WidgetContextType } from '@/types/widget';
import { createContext, useContext, useEffect, useState } from 'react';

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

export function useWidgetContext() {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidgetContext must be used within a WidgetProvider');
  }
  return context;
}

export function WidgetProvider({ children }: { children: React.ReactNode }) {
  const [widgets, setWidgets] = useState<Record<string, Widget>>({});
  const [isLoadingWidgets, setIsLoadingWidgets] = useState<boolean>(true);

  const actions = useWidgetActions({ widgets, setWidgets });

  // useEffect(() => {
  // const fetchWidgets = async () => {
  //   try {
  //     const existingWidgets = await getExistingWidgets();
  //     setWidgets(existingWidgets);
  //   } catch (error) {
  //     console.error('Error fetching widgets:', error);
  //   }
  //   setIsLoadingWidgets(false);
  // };
  // fetchWidgets();
  // }, []);

  return (
    <WidgetContext.Provider
      value={{
        widgets,
        isLoadingWidgets,
        ...actions,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
}
