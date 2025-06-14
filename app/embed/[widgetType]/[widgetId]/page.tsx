import { widgetService } from '@/services/widgetService';
import { apiGetWidgetById } from '../../../../api/widget';
import { apiGetWidgetByIdForEmbed } from '@/api/embed';

type Props = {
  params: Promise<{ widgetId: string }>;
};

const EmbeddedWidget = async ({ params }: Props) => {
  const widgetId = (await params).widgetId;
  const widget = await apiGetWidgetByIdForEmbed(widgetId);

  if (!widget) return <div>Widget not found</div>;

  try {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {/* {widgetService.renderWidget(widget)} */}
      </div>
    );
  } catch (err) {
    console.error('Embed render error: ', err);
    return <div>Embed lỗi hoặc không tìm thấy widget</div>;
  }
};

export default EmbeddedWidget;
