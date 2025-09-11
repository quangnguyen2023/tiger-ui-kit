import { Widget, WidgetType } from '@/types/widget';

type WidgetDimension = { width: number; height: number };
type WidgetSizeConfig = {
  default: WidgetDimension;
  [key: string]: WidgetDimension;
};

// used for Scaling purpose
export const WIDGET_SIZES: Record<WidgetType, WidgetSizeConfig> = {
  [WidgetType.ANALOG_CLOCK]: {
    default: { width: 210, height: 210 },
  },
  [WidgetType.DIGITAL_CLOCK]: {
    default: { width: 500, height: 250 },
    compact: { width: 350, height: 250 },
  },
  [WidgetType.WORLD_CLOCK]: {
    default: { width: 500, height: 300 },
  },
  [WidgetType.WEATHER_FORECAST]: {
    default: { width: 600, height: 400 },
  },
  [WidgetType.CALENDAR]: {
    default: { width: 400, height: 400 },
  },
};

// used for Scaling purpose
export const getWidgetSize = (
  widgetType: WidgetType,
  variant: string = 'default',
) => {
  const sizeConfig = WIDGET_SIZES[widgetType];
  return sizeConfig?.[variant];
};

export const getSizeVariant = (widget: Widget | null): string => {
  if (!widget) return 'default';

  switch (widget.type) {
    case WidgetType.DIGITAL_CLOCK:
      return widget.customValues?.showSeconds ? 'default' : 'compact'; // get size variant based on user selection
    default:
      return 'default';
  }
};
