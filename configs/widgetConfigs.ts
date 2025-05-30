import { WidgetConfig, WidgetType } from '@/types';

export const WIDGET_CONFIGS: Record<WidgetType, WidgetConfig> = {
  [WidgetType.ANALOG_CLOCK]: {
    type: WidgetType.ANALOG_CLOCK,
    customizeFields: [
      {
        prop: 'textColor',
        type: 'COLOR',
        label: 'Text Color',
        defaultValue: '#000',
      },
      {
        prop: 'backgroundColor',
        type: 'COLOR',
        label: 'Background Color',
        defaultValue: '#fff',
      },
      {
        prop: 'enableIndicators',
        type: 'SWITCHER',
        label: 'Enable Indicators',
        options: [
          { label: 'On', value: true },
          { label: 'Off', value: false },
        ],
        defaultValue: true,
      },
      {
        prop: 'title',
        type: 'TEXT',
        label: 'Title',
        defaultValue: '',
      },
    ],
  },

  [WidgetType.DIGITAL_CLOCK]: {
    type: WidgetType.DIGITAL_CLOCK,
    customizeFields: [
      {
        prop: 'textColor',
        type: 'COLOR',
        label: 'Text Color',
        defaultValue: '#000',
      },
    ],
  },

  [WidgetType.WORLD_CLOCK]: {
    type: WidgetType.WORLD_CLOCK,
    customizeFields: [
      {
        prop: 'textColor',
        type: 'COLOR',
        label: 'Text Color',
        defaultValue: '#000',
      },
    ],
  },

  [WidgetType.CALENDAR]: {
    type: WidgetType.CALENDAR,
    customizeFields: [
      {
        prop: 'textColor',
        type: 'COLOR',
        label: 'Text Color',
        defaultValue: '#000',
      },
    ],
  },

  [WidgetType.WEATHER_FORECAST]: {
    type: WidgetType.WEATHER_FORECAST,
    customizeFields: [
      {
        prop: 'textColor',
        type: 'COLOR',
        label: 'Text Color',
        defaultValue: '#000',
      },
    ],
  },
};
