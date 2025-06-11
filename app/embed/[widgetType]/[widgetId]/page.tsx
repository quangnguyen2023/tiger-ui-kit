'use client';

import { useWidgetContext } from '@/contexts/WidgetContext';
import { useParams } from 'next/navigation';
import { widgetService } from '@/services/widgetService';

const EmbeddedWidget = () => {
  const { widgets } = useWidgetContext();
  const { widgetId } = useParams() as { widgetId: string };
  const widget = widgets[widgetId];

  if (!widget) return null;
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {widgetService.renderWidget(widget)}
    </div>
  );
};

export default EmbeddedWidget;
