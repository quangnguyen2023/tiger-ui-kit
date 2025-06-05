import {
  apiCreateWidget,
  apiDeleteWidget,
  apiSaveWidget,
  getExistingWidgets,
} from '@/api/widget';
import { Widget, WidgetType } from '@/types/widget';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useWidget = () => {
  const [widgets, setWidgets] = useState<Record<string, Widget>>({});
  const [isLoadingWidgets, setIsLoadingWidgets] = useState<boolean>(true);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const existingWidgets = await getExistingWidgets();
        setWidgets(existingWidgets);
      } catch (error) {
        console.error('Error fetching widgets:', error);
      }
      setIsLoadingWidgets(false);
    };

    fetchWidgets();
  }, []);

  const refreshWidgets = useCallback(async () => {
    setWidgets(await getExistingWidgets());
  }, []);

  const getWidgetsByType = useCallback(
    (type: WidgetType) => {
      return Object.values(widgets).filter((widget) => widget.type === type);
    },
    [widgets]
  );

  const createWidget = useCallback(
    async (type: WidgetType) => {
      const id = uuidv4();
      const instance: Widget = {
        id,
        type,
        owner: '1',
        customValues: {},
        createdAt: new Date().toISOString(),
        name: `New ${type.replace('_', ' ')}`,
      };

      await apiCreateWidget(id, instance);
      refreshWidgets();

      return id;
    },
    [refreshWidgets]
  );

  const updateWidget = useCallback((id: string, prop: Record<string, any>) => {
    setWidgets((prev) => {
      const currentWidget = prev[id];
      const updatedWidget = {
        ...currentWidget,
        customValues: {
          ...currentWidget.customValues,
          ...prop,
        },
      };

      return { ...prev, [id]: updatedWidget };
    });
  }, []);

  const saveWidget = useCallback(
    async (id: string) => {
      const updatedWidget = widgets[id];
      await apiSaveWidget(id, updatedWidget);
      refreshWidgets();
    },
    [refreshWidgets]
  );

  const deleteWidget = useCallback(
    async (id: string) => {
      await apiDeleteWidget(id);
      refreshWidgets();
    },
    [refreshWidgets]
  );

  return {
    widgets,
    isLoadingWidgets,
    getWidgetsByType,
    createWidget,
    updateWidget,
    saveWidget,
    deleteWidget,
  };
};

export default useWidget;
