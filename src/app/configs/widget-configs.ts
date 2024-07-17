import { CustomizeItemType, Widget, WidgetType } from "../types";

export const DIGITAL_CLOCK_CONFIG: Widget = {
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