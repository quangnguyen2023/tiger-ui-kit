import { useAutoScale } from '@/hooks/useAutoScale';
import EmbedLink from './EmbedLink';
import WidgetRenderer from '@/components/WidgetRenderer';
import { Widget, WidgetType } from '@/types/widget';
import { useState } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { getSizeVariant, getWidgetSize } from '@/configs/widgetSizes';
import { usePathname } from 'next/navigation';

type WidgetPreviewProps = {
  widget: Widget;
  widgetTypeFromURL: WidgetType;
};

const WidgetPreview = ({ widget, widgetTypeFromURL }: WidgetPreviewProps) => {
  const pathname = usePathname(); // " /widget-customizer/[widgetType]/[widgetId] "
  const isCustomizing = pathname.split('/').length > 3;

  const sizeVariant = getSizeVariant(widget);
  const baseSize = getWidgetSize(
    widget?.type || widgetTypeFromURL,
    sizeVariant,
  );

  const [containerSize, setContainerSize] = useState(baseSize);

  const scale = useAutoScale(containerSize, baseSize, 3);

  const handleResize = (e: any, { size }: ResizeCallbackData) => {
    setContainerSize({ width: size.width, height: size.height });
  };

  return (
    <div className="relative flex h-full w-full flex-1 items-center justify-center">
      {widget && (
        <div className="absolute top-6 z-10">
          <EmbedLink widgetType={widget.type} />
        </div>
      )}

      {isCustomizing ? (
        <ResizableBox
          width={containerSize.width}
          height={containerSize.height}
          minConstraints={[200, 100]}
          onResize={handleResize}
          draggableOpts={{ grid: [25, 25] }}
          className="overflow-hidden"
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            <WidgetRenderer
              widget={widget}
              widgetTypeFromURL={widgetTypeFromURL}
            />
          </div>
        </ResizableBox>
      ) : (
        <WidgetRenderer widget={widget} widgetTypeFromURL={widgetTypeFromURL} />
      )}
    </div>
  );
};

export default WidgetPreview;
