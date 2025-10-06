'use client';
import { useMemo } from 'react';
import { Widget, WidgetType } from '@/types/widget';
import { renderWidgetComponent } from '@/lib/widgetUtils';

type WidgetRendererProps = {
  widget: Widget;
  widgetTypeFromURL: WidgetType;
};

const WidgetRenderer = ({ widget, widgetTypeFromURL }: WidgetRendererProps) => {
  const widgetType = widget?.type || widgetTypeFromURL;
  return useMemo(() => {
    return renderWidgetComponent(widgetType, widget?.customValues);
  }, [widgetType, widget?.customValues]);
};

export default WidgetRenderer;
