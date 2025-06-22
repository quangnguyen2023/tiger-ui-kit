'use client';

import EmbedLink from './EmbedLink';
import WidgetRenderer from '@/components/WidgetRenderer';
import { Widget } from '@/types/widget';

type WidgetPreviewProps = {
  widget: Widget;
};

const WidgetPreview = ({ widget }: WidgetPreviewProps) => {
  return (
    <div className="flex-1 relative flex justify-center items-center">
      {widget && (
        <div className="absolute top-6 z-10">
          <EmbedLink widgetType={widget.type} />
        </div>
      )}

      <WidgetRenderer widget={widget} />
    </div>
  );
};

export default WidgetPreview;
