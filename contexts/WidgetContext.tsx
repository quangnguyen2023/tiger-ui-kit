'use client';

import { SIDEBAR_ITEMS } from '@/constants';
import { WidgetType } from '@/types';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface WidgetContextType {
  selectedWidget: WidgetType;
  setSelectedWidget: Dispatch<SetStateAction<WidgetType>>;
  widgetProps?: Record<WidgetType, Record<string, any>>;
  updateWidgetProps?: (
    widgetType: WidgetType,
    props: Record<string, any>
  ) => void;
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
  const [selectedWidget, setSelectedWidget] = useState<WidgetType>(
    SIDEBAR_ITEMS[0].widgetType
  );
  const [widgetProps, setWidgetProps] = useState<
    Record<WidgetType, Record<string, any>>
  >({
    [WidgetType.ANALOG_CLOCK]: {},
    [WidgetType.DIGITAL_CLOCK]: {},
    [WidgetType.WORLD_CLOCK]: {},
    [WidgetType.CALENDAR]: {},
    [WidgetType.WEATHER_FORECAST]: {},
  });

  const updateWidgetProps = (
    widgetType: WidgetType,
    props: Record<string, any>
  ) => {
    setWidgetProps((prev) => ({
      ...prev,
      [widgetType]: {
        ...prev[widgetType],
        ...props,
      },
    }));
  };

  return (
    <WidgetContext.Provider
      value={{
        selectedWidget,
        setSelectedWidget,
        widgetProps,
        updateWidgetProps,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
}
