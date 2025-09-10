import { WidgetConfig, WidgetType } from '@/types/widget';

export const WIDGET_CONFIGS: Record<WidgetType, WidgetConfig> = {
  [WidgetType.ANALOG_CLOCK]: {
    type: WidgetType.ANALOG_CLOCK,
    customizeFields: [
      {
        prop: 'title',
        type: 'TEXT',
        label: 'Title',
        defaultValue: '',
      },
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
        prop: 'size',
        type: 'SWITCHER',
        label: 'Size',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ],
        defaultValue: 60,
      },
      {
        prop: 'enableIndicators',
        type: 'SWITCHER',
        label: 'Indicators',
        options: [
          { label: 'On', value: true },
          { label: 'Off', value: false },
        ],
        defaultValue: true,
      },
      {
        prop: 'updateDuration',
        type: 'NUMBER',
        label: 'Duration (seconds)',
        defaultValue: 60,
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
      {
        prop: 'backgroundColor',
        type: 'COLOR',
        label: 'Background Color',
        defaultValue: '#fff',
      },
      {
        prop: 'use24Hours',
        type: 'SWITCHER',
        label: 'Clock Type',
        options: [
          { label: '12 hours', value: false },
          { label: '24 hours', value: true },
        ],
        defaultValue: true,
      },
      {
        prop: 'showSeconds',
        type: 'SWITCHER',
        label: 'Show Seconds',
        options: [
          { label: 'Show', value: true },
          { label: 'Hide', value: false },
        ],
        defaultValue: true,
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
