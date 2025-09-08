import { Widget, WidgetType } from '@/types/widget';
import { renderWidgetComponent } from '@/lib/widgetUtils';

type WidgetRendererProps = {
  widget: Widget;
  widgetTypeFromURL: WidgetType;
  scale?: number;
};

const WidgetRenderer = ({
  widget,
  widgetTypeFromURL,
  scale,
}: WidgetRendererProps) => {
  const widgetType = widget?.type || widgetTypeFromURL;
  return renderWidgetComponent(widgetType, widget?.customValues, scale);
};

export default WidgetRenderer;
