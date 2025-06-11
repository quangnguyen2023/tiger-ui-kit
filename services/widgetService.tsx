import { Widget, WidgetType } from '@/types/widget';
import AnalogClock from '../components/widgets/AnalogClock';
import DigitalClock from '../components/widgets/DigitalClock';
import WorldClock from '../components/widgets/WorldClock';
import WeatherForecast from '../components/widgets/WeatherForecast';

export const widgetService = {
  renderWidget: (widget: Widget) => {
    switch (widget?.type) {
      case WidgetType.ANALOG_CLOCK:
        return <AnalogClock {...widget?.customValues} />;
      case WidgetType.DIGITAL_CLOCK:
        return <DigitalClock {...widget?.customValues} />;
      case WidgetType.WORLD_CLOCK:
        return <WorldClock {...widget?.customValues} />;
      case WidgetType.WEATHER_FORECAST:
        return <WeatherForecast {...widget?.customValues} />;
      default:
        return null;
    }
  },
};
