import { widgetService } from '@/services/widgetService';
import { apiGetWidgetById } from '../../../../api/widget';

type Props = {
  params: { widgetId: string };
};

const EmbeddedWidget = async ({ params }: Props) => {
  const widget = await apiGetWidgetById(params.widgetId);

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
