import { CustomizeItemType, WidgetConfig, WidgetType } from '../types';

export const DIGITAL_CLOCK_CONFIG: WidgetConfig = {
  name: 'Digital Clock',
  type: WidgetType.Digital_Clock,
  customizeItems: [
    {
      title: 'Text Color',
      fieldName: 'textColor',
      type: CustomizeItemType.COLOR,
      defaultValue: '#7BDCB5',
    },
    {
      title: 'Background Color',
      fieldName: 'bgColor',
      type: CustomizeItemType.COLOR,
      defaultValue: '#333',
    },
  ],
};

export const ANALOG_CLOCK_CONFIG: WidgetConfig = {
  name: 'Analog Clock',
  type: WidgetType.Analog_Clock,
  customizeItems: [
    {
      title: 'Text Color',
      fieldName: 'textColor',
      type: CustomizeItemType.COLOR,
      defaultValue: '#7BDCB5',
    },
    {
      title: 'Background Color',
      fieldName: 'bgColor',
      type: CustomizeItemType.COLOR,
      defaultValue: '#333',
    },
    {
      title: 'Enable indicators',
      fieldName: 'enableIndicators',
      type: CustomizeItemType.SWITCHER,
      defaultValue: false,
      options: [
        { label: 'On', value: true },
        { label: 'Off', value: false },
      ],
    },
    {
      title: 'Size',
      fieldName: 'size',
      type: CustomizeItemType.SWITCHER,
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    },
    {
      title: 'Title',
      fieldName: 'title',
      type: CustomizeItemType.INPUT,
      defaultValue: 'HCM',
    },
    {
      title: 'Update Duration',
      fieldName: 'updateDuration',
      type: CustomizeItemType.NUMBER,
      defaultValue: 1000,
    },
  ],
};

export const CALENDAR_CONFIG: WidgetConfig = {
  name: 'Calendar',
  type: WidgetType.Calendar,
  customizeItems: [
    {
      title: 'Enable Lunar Calendar',
      fieldName: 'enableLunar',
      type: CustomizeItemType.SWITCHER,
      options: [
        { label: 'On', value: true },
        { label: 'Off', value: false },
      ],
      defaultValue: false,
    },
    {
      title: 'First Day of the Week',
      fieldName: 'firstDayOfWeek',
      type: CustomizeItemType.SWITCHER,
      options: [
        { label: 'Monday', value: 'Monday' },
        { label: 'Sunday', value: 'Sunday' },
      ],
      defaultValue: 'Monday',
    },
  ],
};

export const WEATHER_FORECAST_CONFIG: WidgetConfig = {
  name: 'Weather Forecast',
  type: WidgetType.Weather_Forecast,
  customizeItems: [
    {
      title: 'Size',
      fieldName: 'size',
      type: CustomizeItemType.SWITCHER,
      defaultValue: 'small',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ],
    }
  ],
};
