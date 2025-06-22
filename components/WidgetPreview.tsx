'use client';

import EmbedLink from './EmbedLink';
import WidgetRenderer from '@/components/WidgetRenderer';
import { Widget, WidgetType } from '@/types/widget';

type WidgetPreviewProps = {
  widget: Widget;
  selectedWidget: WidgetType;
};

const WidgetPreview = ({ widget, selectedWidget }: WidgetPreviewProps) => {
  return (
    <div className="flex-1 relative flex justify-center items-center">
      {widget && (
        <div className="absolute top-6 z-10">
          <EmbedLink widgetType={widget.type} />
        </div>
      )}

      <WidgetRenderer widget={widget} selectedWidget={selectedWidget} />
    </div>
  );
};

export default WidgetPreview;
