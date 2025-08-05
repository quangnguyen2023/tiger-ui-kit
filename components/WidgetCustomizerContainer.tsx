'use client';

import SecondarySidebar from '@/components/SecondarySidebar';
import WidgetPreview from '@/components/WidgetPreview';
import { useWidgetContext } from '@/contexts/WidgetContext';
import { WidgetType } from '@/types/widget';
import { useParams } from 'next/navigation';

const WidgetCustomizerContainer = () => {
  const { widgets } = useWidgetContext();
  const { widgetId, widgetType } = useParams() as {
    widgetId: string;
    widgetType: WidgetType;
  };
  const currentWidget = widgets[widgetId];

  // 4rem: TopNavigation height
  return (
    <div className="ml-80 h-full">
      <SecondarySidebar widgetType={widgetType} />
      <WidgetPreview widget={currentWidget} widgetTypeFromURL={widgetType} />
    </div>
  );
};

export default WidgetCustomizerContainer;
