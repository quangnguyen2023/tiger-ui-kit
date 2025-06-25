'use client';

import { useWidgetContext } from '@/contexts/WidgetContext';
import { useParams, useRouter } from 'next/navigation';
import { WidgetType } from '@/types/widget';
import { useEffect } from 'react';
import WidgetListSidebar from '@/components/WidgetListSidebar';
import WidgetCustomizerSidebar from '@/components/WidgetCustomizerSidebar';

type SecondarySidebarProps = {
  widgetType: WidgetType;
};

const SecondarySidebar = ({ widgetType }: SecondarySidebarProps) => {
  const {
    widgets,
    isLoadingWidgets,
    createWidget,
    updateWidget,
    deleteWidget,
    getWidgetsByType,
  } = useWidgetContext();

  const { widgetId } = useParams() as { widgetId: string };
  const { push } = useRouter();

  useEffect(() => {
    // If the widget is not found, redirect to the widget creation page
    if (widgetId && !widgets[widgetId] && !isLoadingWidgets) {
      push('/widget-customizer');
    }
  }, [widgetId, widgets, isLoadingWidgets, push]);

  // Return nothing if widgetId is invalid and not loading widgets
  if (widgetId && !widgets[widgetId] && !isLoadingWidgets) return null;

  // If widgetId exists then showing the customization fields
  if (widgetId && widgets[widgetId]) {
    return (
      <WidgetCustomizerSidebar
        widgets={widgets}
        widgetId={widgetId}
        widgetType={widgetType}
        updateWidget={updateWidget}
      />
    );
  }

  // If no widgetId, show the sidebar with options to create or select existing widgets
  return (
    <WidgetListSidebar
      widgetType={widgetType}
      createWidget={createWidget}
      deleteWidget={deleteWidget}
      getWidgetsByType={getWidgetsByType}
    />
  );
};

export default SecondarySidebar;
