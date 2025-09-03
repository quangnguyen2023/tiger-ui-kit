import { Widget, WidgetType } from '@/types/widget';
import { renderWidgetComponent } from '@/lib/widgetUtils';

type WidgetRendererProps = {
  widget: Widget;
  widgetTypeFromURL: WidgetType;
};

const WidgetRenderer = ({ widget, widgetTypeFromURL }: WidgetRendererProps) => {
  const widgetType = widget?.type || widgetTypeFromURL;
  return renderWidgetComponent(widgetType, widget?.customValues);
};

export default WidgetRenderer;
