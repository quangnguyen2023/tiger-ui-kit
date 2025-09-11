'use client';

import { WidgetType } from '@/types/widget';
import WidgetRenderer from '@/components/WidgetRenderer';
import { getSizeVariant, getWidgetSize } from '@/configs/widgetSizes';
import { useAutoScale } from '@/hooks/useAutoScale';
import { useEffect, useState } from 'react';
import { apiGetWidgetById } from '@/api/widget';

type EmbedWidgetClientProps = {
  widget: NonNullable<Awaited<ReturnType<typeof apiGetWidgetById>>>;
  widgetType: WidgetType;
};

const EmbedWidgetClient = ({ widget, widgetType }: EmbedWidgetClientProps) => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const sizeVariant = getSizeVariant(widget);
  const baseSize = getWidgetSize(widgetType, sizeVariant);

  useEffect(() => {
    const updateSize = () => {
      setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const scale = useAutoScale(containerSize, baseSize, 15);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-in-out',
        }}
      >
        <WidgetRenderer widget={widget} widgetTypeFromURL={widgetType} />
      </div>
    </div>
  );
};

export default EmbedWidgetClient;
