'use client';

import { useWidgetContext } from '@/contexts/WidgetContext';
import { useParams } from 'next/navigation';
import { widgetService } from '@/services/widgetService';

const EmbeddedWidget = () => {
  const { widgets } = useWidgetContext();
  const { widgetId } = useParams() as { widgetId: string };
  const widget = widgets[widgetId];

  if (!widget) return <div>Widget not found</div>;

  try {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {widgetService.renderWidget(widget)}
      </div>
    );
  } catch (err) {
    console.error('Embed render error: ', err);
    return <div>Embed lỗi hoặc không tìm thấy widget</div>;
  }
};

export default EmbeddedWidget;
