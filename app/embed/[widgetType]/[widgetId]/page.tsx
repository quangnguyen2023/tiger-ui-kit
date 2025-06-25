import { WidgetType } from '@/types/widget';
import { apiGetWidgetById } from '../../../../api/widget';
import WidgetRenderer from '@/components/WidgetRenderer';

type Props = {
  params: Promise<{ widgetId: string; widgetType: WidgetType }>;
};

const EmbeddedWidget = async ({ params }: Props) => {
  const { widgetId, widgetType } = await params;
  const widget = await apiGetWidgetById(widgetId);

  if (!widget) return <div>Widget not found</div>;

  try {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <WidgetRenderer widget={widget} widgetTypeFromURL={widgetType} />
      </div>
    );
  } catch (err) {
    console.error('Embed render error: ', err);
    return <div>Embed lỗi hoặc không tìm thấy widget</div>;
  }
};

export default EmbeddedWidget;
