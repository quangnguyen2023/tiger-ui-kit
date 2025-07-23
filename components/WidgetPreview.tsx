import EmbedLink from './EmbedLink';
import WidgetRenderer from '@/components/WidgetRenderer';
import { Widget, WidgetType } from '@/types/widget';

type WidgetPreviewProps = {
  widget: Widget;
  widgetTypeFromURL: WidgetType;
};

const WidgetPreview = ({ widget, widgetTypeFromURL }: WidgetPreviewProps) => {
  return (
    <div className="relative flex h-full flex-1 items-center justify-center">
      {widget && (
        <div className="absolute top-6 z-10">
          <EmbedLink widgetType={widget.type} />
        </div>
      )}

      <WidgetRenderer widget={widget} widgetTypeFromURL={widgetTypeFromURL} />
    </div>
  );
};

export default WidgetPreview;
