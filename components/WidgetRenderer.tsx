'use client';
import { useMemo } from 'react';
import { Widget, WidgetType } from '@/types/widget';
import { renderWidgetComponent } from '@/lib/widgetUtils';
import { WIDGET_CONFIGS } from '@/configs/widgetConfigs';

type WidgetRendererProps = {
  widget: Widget;
  widgetTypeFromURL: WidgetType;
};

const WidgetRenderer = ({ widget, widgetTypeFromURL }: WidgetRendererProps) => {
  const widgetType = widget?.type || widgetTypeFromURL;
  const widgetConfig = WIDGET_CONFIGS[widgetType];
  const dataProps = widgetConfig?.dataAdapter?.(widget) || {};

  return useMemo(() => {
    return renderWidgetComponent(widgetType, {
      ...widget?.customValues,
      ...dataProps,
    });
  }, [widgetType, widget?.customValues, dataProps]);
};

export default WidgetRenderer;
