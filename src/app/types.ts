import { CustomizeItem } from "./components/customize-page/WidgetCustomize/WidgetCustomize";

export enum WidgetType {
  Analog_Clock,
  Digital_Clock,
  World_Clock,
  Calendar,
  Weather_Forecast,
}

export enum CustomizeItemType {
  'COLOR',
  'SWITCHER',
  'INPUT',
  'NUMBER',
}

export type Widget = {
  name: string;
  type: WidgetType | null;
  customizeItems: CustomizeItem[];
};

export type CustomizeProps = {
  [key: string]: any;
};

export type IconType = {
  width?: number | string;
  height?: number | string;
};
