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
    },
    {
      title: 'Background Color',
      fieldName: 'bgColor',
      type: CustomizeItemType.COLOR,
    },
    {
      title: 'Enable indicators',
      fieldName: 'enableIndicators',
      type: CustomizeItemType.SWITCHER,
      options: [
        { label: 'On', value: true },
        { label: 'Off', value: false }
      ]
    },
    {
      title: 'Size',
      fieldName: 'size',
      type: CustomizeItemType.SWITCHER,
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
    },
    {
      title: 'Update Duration',
      fieldName: 'updateDuration',
      type: CustomizeItemType.NUMBER
    }
  ],
}