import { WidgetType } from '@/types/widget';
import { apiGetWidgetById } from '../../../../api/widget';
import EmbedWidgetClient from '@/components/EmbedWidgetClient';

type Props = {
  params: Promise<{ widgetId: string; widgetType: WidgetType }>;
};

const EmbeddedWidget = async ({ params }: Props) => {
  const { widgetId, widgetType } = await params;
  const widget = await apiGetWidgetById(widgetId);

  if (!widget)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        Widget not found
      </div>
    );

  return <EmbedWidgetClient widget={widget} widgetType={widgetType} />;
};

export default EmbeddedWidget;
