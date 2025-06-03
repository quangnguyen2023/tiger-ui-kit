'use client';

import { SIDEBAR_ITEMS } from '@/constants';
import { Widget, WidgetType } from '@/types/widget';
import { WidgetContextType } from '@/types/widget';
import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
  const [widgets, setWidgets] = useState<Record<string, Widget>>({});

  const createWidget = (type: WidgetType) => {
    const id = uuidv4();
    const instance: Widget = {
      id,
      type,
      owner: '1',
      customValues: {},
      createdAt: new Date().toISOString(),
      name: `New ${type.replace('_', ' ')}`,
    };

    setWidgets((prev) => ({
      ...prev,
      [id]: instance,
    }));

    return id;
  };

  const updateWidget = (widgetId: string, prop: Record<string, any>) => {
    setWidgets((prev) => {
      const currentWidget = prev[widgetId];
      const updatedWidget = {
        ...currentWidget,
        customValues: {
          ...currentWidget.customValues,
          ...prop,
        },
      };

      return {
        ...prev,
        [widgetId]: updatedWidget,
      };
    });
  };

  const deleteWidget = (widgetId: string) => {
    setWidgets((prev) => {
      const { [widgetId]: deleted, ...rest } = prev;
      return rest;
    });
  };

  const getWidgetsByType = (type: WidgetType) => {
    return Object.values(widgets).filter((widget) => widget.type === type);
  };

  return (
    <WidgetContext.Provider
      value={{
        selectedWidget,
        setSelectedWidget,
        widgets,
        createWidget,
        updateWidget,
        deleteWidget,
        getWidgetsByType,
      }}
    >
      {children}
    </WidgetContext.Provider>
  );
}
