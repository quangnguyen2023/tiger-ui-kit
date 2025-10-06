import { useMemo } from 'react';
import AnalogClock from '@/components/widgets/AnalogClock';
import Calendar from '@/components/widgets/Calendar';
import DigitalClock from '@/components/widgets/DigitalClock';
import WeatherForecast from '@/components/widgets/WeatherForecast';
import WorldClock from '@/components/widgets/WorldClock';
import { WidgetType } from '@/types/widget';

export const WIDGET_TABS = [
  { value: WidgetType.ANALOG_CLOCK, label: 'Analog Clock' },
  { value: WidgetType.DIGITAL_CLOCK, label: 'Digital Clock' },
  { value: WidgetType.WORLD_CLOCK, label: 'World Clock' },
  { value: WidgetType.WEATHER_FORECAST, label: 'Weather Forecast' },
  { value: WidgetType.CALENDAR, label: 'Calendar' },
];

export const getWidgetLabel = (widgetType: WidgetType): string => {
  const tab = WIDGET_TABS.find((tab) => tab.value === widgetType);
  return tab?.label || 'Unknown Widget';
};

export const isWidgetTypeSupported = (widgetType: WidgetType): boolean => {
  return WIDGET_TABS.some((tab) => tab.value === widgetType);
};

/**
 * Utility function to render widget component based on widget type
 */
export const renderWidgetComponent = (
  widgetType: WidgetType,
  customValues?: Record<string, any>,
) => {
  switch (widgetType) {
    case WidgetType.ANALOG_CLOCK:
      return <AnalogClock {...customValues} />;
    case WidgetType.DIGITAL_CLOCK:
      return <DigitalClock {...customValues} />;
    case WidgetType.WORLD_CLOCK:
      return <WorldClock {...customValues} />;
    case WidgetType.WEATHER_FORECAST:
      return <WeatherForecast {...customValues} />;
    case WidgetType.CALENDAR:
      return <Calendar {...customValues} />;
    default:
      return <AnalogClock {...customValues} />;
  }
};
