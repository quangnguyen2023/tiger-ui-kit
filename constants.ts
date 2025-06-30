import {
  Clock,
  Clock10,
  Clock11Icon,
  Calendar,
  Wind,
  PackageOpen,
} from 'lucide-react';
import { WidgetType } from './types/widget';

export const MYWIDGETS_VIEW_KEY = 'my-widgets';

export const PATH_WIDGET_CUSTOMIZER = '/widget-customizer';

export const SIDEBAR_MODULES = [
  {
    label: 'General',
    items: [
      {
        viewKey: MYWIDGETS_VIEW_KEY,
        icon: PackageOpen,
        label: 'My Widgets',
        path: `${PATH_WIDGET_CUSTOMIZER}/my-widgets`,
      },
    ],
  },
  {
    label: 'Widgets',
    items: [
      {
        viewKey: 'analog',
        icon: Clock,
        label: 'Analog Clock',
        path: `${PATH_WIDGET_CUSTOMIZER}/${WidgetType.ANALOG_CLOCK}`,
      },
      {
        viewKey: 'digital',
        icon: Clock10,
        label: 'Digital Clock',
        path: `${PATH_WIDGET_CUSTOMIZER}/${WidgetType.DIGITAL_CLOCK}`,
      },
      {
        viewKey: 'world',
        icon: Clock11Icon,
        label: 'World Clock',
        path: `${PATH_WIDGET_CUSTOMIZER}/${WidgetType.WORLD_CLOCK}`,
      },
      {
        viewKey: 'weather',
        icon: Wind,
        label: 'Weather Forecast',
        path: `${PATH_WIDGET_CUSTOMIZER}/${WidgetType.WEATHER_FORECAST}`,
      },
      {
        viewKey: 'calendar',
        icon: Calendar,
        label: 'Calendar',
        path: `${PATH_WIDGET_CUSTOMIZER}/${WidgetType.CALENDAR}`,
      },
    ],
  },
];
