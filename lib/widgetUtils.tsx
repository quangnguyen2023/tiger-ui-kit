import AnalogClock from '@/components/widgets/AnalogClock';
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
      return (
        <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-200">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <span className="text-2xl">📅</span>
            </div>
            <div className="text-lg font-semibold text-purple-700">
              Calendar Widget
            </div>
            <div className="text-sm text-purple-600">Coming Soon</div>
          </div>
        </div>
      );
    default:
      return <AnalogClock {...customValues} />;
  }
};
