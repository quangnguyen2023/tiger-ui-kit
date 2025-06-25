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

export const SIDEBAR_WIDGETS = [
  {
    viewKey: 'analog',
    icon: Clock,
    label: 'Analog Clock',
    widgetType: WidgetType.ANALOG_CLOCK,
    path: `${PATH_WIDGET_CUSTOMIZER}/${WidgetType.ANALOG_CLOCK}`,
  },
  {
    viewKey: 'digital',
    icon: Clock10,
    label: 'Digital Clock',
    widgetType: WidgetType.DIGITAL_CLOCK,
    path: `${PATH_WIDGET_CUSTOMIZER}/${WidgetType.DIGITAL_CLOCK}`,
  },
  {
    viewKey: 'world',
    icon: Clock11Icon,
    label: 'World Clock',
    widgetType: WidgetType.WORLD_CLOCK,
    path: `${PATH_WIDGET_CUSTOMIZER}/${WidgetType.WORLD_CLOCK}`,
  },
  {
    viewKey: 'weather',
    icon: Wind,
    label: 'Weather Forecast',
    widgetType: WidgetType.WEATHER_FORECAST,
    path: `${PATH_WIDGET_CUSTOMIZER}/${WidgetType.WEATHER_FORECAST}`,
  },
  {
    viewKey: 'calendar',
    icon: Calendar,
    label: 'Calendar',
    widgetType: WidgetType.CALENDAR,
    path: `${PATH_WIDGET_CUSTOMIZER}/${WidgetType.CALENDAR}`,
  },
];

export const SIDEBAR_MODULES = [
  {
    label: 'General',
    items: [
      {
        viewKey: MYWIDGETS_VIEW_KEY,
        icon: PackageOpen,
        label: 'My Widgets',
        path: '/my-widgets',
      },
    ],
  },
  {
    label: 'Widgets',
    items: SIDEBAR_WIDGETS,
  },
];
