import { Clock, Clock10, Clock11Icon, Calendar, Wind } from 'lucide-react';
import { WidgetType } from './types/widget';

export const SIDEBAR_ITEMS = [
  { icon: Clock, label: 'Analog Clock', widgetType: WidgetType.ANALOG_CLOCK },
  {
    icon: Clock10,
    label: 'Digital Clock',
    widgetType: WidgetType.DIGITAL_CLOCK,
  },
  {
    icon: Clock11Icon,
    label: 'World Clock',
    widgetType: WidgetType.WORLD_CLOCK,
  },
  {
    icon: Wind,
    label: 'Weather Forecast',
    widgetType: WidgetType.WEATHER_FORECAST,
  },
  { icon: Calendar, label: 'Calendar', widgetType: WidgetType.CALENDAR },
];
