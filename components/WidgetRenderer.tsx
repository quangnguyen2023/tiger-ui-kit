import AnalogClock from '@/components/widgets/AnalogClock';
import DigitalClock from '@/components/widgets/DigitalClock';
import WeatherForecast from '@/components/widgets/WeatherForecast';
import WorldClock from '@/components/widgets/WorldClock';
import { Widget, WidgetType } from '@/types/widget';

type WidgetRendererProps = {
  widget: Widget;
};

const WidgetRenderer = ({ widget }: WidgetRendererProps) => {
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
};

export default WidgetRenderer;
