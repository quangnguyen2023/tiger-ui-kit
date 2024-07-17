import { CustomizeItemType, WidgetConfig, WidgetType } from "../types";

export const DIGITAL_CLOCK_CONFIG: WidgetConfig = {
  name: 'Digital Clock',
  type: WidgetType.Digital_Clock,
  customizeItems: [
    {
      title: 'Text Color',
      fieldName: 'textColor',
      type: CustomizeItemType.COLOR,
    },
    {
      title: 'Background Color',
      fieldName: 'bgColor',
      type: CustomizeItemType.COLOR,
    },
  ],
}

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
      defaultValue: '#333'
    },
    {
      title: 'Enable indicators',
      fieldName: 'enableIndicators',
      type: CustomizeItemType.SWITCHER,
      defaultValue: false,
      options: [
        { label: 'On', value: true },
        { label: 'Off', value: false }
      ]
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
      ]
    },
    {
      title: 'Title',
      fieldName: 'title',
      type: CustomizeItemType.INPUT,
      defaultValue: ''
    },
    {
      title: 'Update Duration',
      fieldName: 'updateDuration',
      type: CustomizeItemType.NUMBER,
      defaultValue: 1000
    }
  ],
}