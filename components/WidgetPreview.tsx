'use client';

import { useWidgetContext } from '@/contexts/WidgetContext';
import EmbedLink from './EmbedLink';
import { useParams } from 'next/navigation';
import WidgetRenderer from '@/components/WidgetRenderer';

const WidgetPreview = () => {
  const { widgets } = useWidgetContext();
  const { widgetId } = useParams() as { widgetId: string };
  const currentWidget = widgets[widgetId];

  return (
    <div className="flex-1 relative flex justify-center items-center">
      {currentWidget && (
        <div className="absolute top-6 z-10">
          <EmbedLink widgetType={currentWidget.type} />
        </div>
      )}

      <WidgetRenderer widget={currentWidget} />
    </div>
  );
};

export default WidgetPreview;
