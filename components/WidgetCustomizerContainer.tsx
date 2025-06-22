'use client';

import SecondarySidebar from '@/components/SecondarySidebar';
import WidgetPreview from '@/components/WidgetPreview';
import { useWidgetContext } from '@/contexts/WidgetContext';
import { useParams } from 'next/navigation';

const WidgetCustomizerContainer = () => {
  const { widgets } = useWidgetContext();
  const { widgetId } = useParams() as { widgetId: string };
  const currentWidget = widgets[widgetId];

  return (
    <>
      <SecondarySidebar widgetType={currentWidget?.type} />
      <WidgetPreview widget={currentWidget} />
    </>
  );
};

export default WidgetCustomizerContainer;
