import { useAutoScale } from '@/hooks/useAutoScale';
import EmbedLink from './EmbedLink';
import WidgetRenderer from '@/components/WidgetRenderer';
import { Widget, WidgetType } from '@/types/widget';
import { useState } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';

type WidgetPreviewProps = {
  widget: Widget;
  widgetTypeFromURL: WidgetType;
};

const WidgetPreview = ({ widget, widgetTypeFromURL }: WidgetPreviewProps) => {
  const [size, setSize] = useState({ width: 500, height: 200 });
  const baseSize = { width: 500, height: 200 }; // Base size for scaling

  const scale = useAutoScale(size, baseSize, 5);

  const handleResize = (e: any, { size }: ResizeCallbackData) => {
    setSize({ width: size.width, height: size.height });
  };

  return (
    <div className="relative flex h-full w-full flex-1 items-center justify-center">
      {widget && (
        <div className="absolute top-6 z-10">
          <EmbedLink widgetType={widget.type} />
        </div>
      )}

      <ResizableBox
        width={size.width}
        height={size.height}
        minConstraints={[200, 100]}
        // maxConstraints={[1000, 600]}
        onResize={handleResize}
        draggableOpts={{ grid: [25, 25] }}
        className="overflow-hidden"
      >
        <WidgetRenderer
          widget={widget}
          widgetTypeFromURL={widgetTypeFromURL}
          scale={scale}
        />
      </ResizableBox>
    </div>
  );
};

export default WidgetPreview;
