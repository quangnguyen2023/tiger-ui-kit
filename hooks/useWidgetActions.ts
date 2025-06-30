import {
  apiCreateWidget,
  apiDeleteWidget,
  apiGetWidgetsByType,
  apiSaveWidget,
  getExistingWidgets,
} from '@/api/widget';
import { Widget, WidgetType } from '@/types/widget';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

type UseWidgetActionsProps = {
  widgets: Record<string, Widget>;
  setWidgets: React.Dispatch<React.SetStateAction<Record<string, Widget>>>;
};

const useWidgetActions = ({ widgets, setWidgets }: UseWidgetActionsProps) => {
  const refreshWidgets = useCallback(async () => {
    setWidgets(await getExistingWidgets());
  }, []);

  const getWidgetsByType = async (type: string | WidgetType) => {
    let widgetType = type === 'all' ? undefined : type;
    const widgets = await apiGetWidgetsByType(widgetType);
    return widgets;
  };

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

      await apiCreateWidget(instance);
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
    [refreshWidgets, widgets]
  );

  const deleteWidget = useCallback(
    async (id: string) => {
      await apiDeleteWidget(id);
      refreshWidgets();
    },
    [refreshWidgets]
  );

  return {
    getWidgetsByType,
    createWidget,
    updateWidget,
    saveWidget,
    deleteWidget,
  };
};

export default useWidgetActions;
