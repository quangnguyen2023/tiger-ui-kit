// import { CustomizeItem } from "./components/customize-page/WidgetCustomize/WidgetCustomize";

declare global {
  type TextFieldProps = {
    label: string;
    value?: string;
    placeholder?: string;
    helperText?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    type?: 'text' | 'password' | 'email' | 'number';
  };

  type CustomSwitchType = {
    label: string;
    options: { label: string; value: string | number | boolean }[];
    selectedOption?: string | number | boolean;
    onChange?: (value: string | number | boolean) => void;
  };
}

export enum WidgetType {
  ANALOG_CLOCK = 'ANALOG_CLOCK',
  DIGITAL_CLOCK = 'DIGITAL_CLOCK',
  WORLD_CLOCK = 'WORLD_CLOCK',
  CALENDAR = 'CALENDAR',
  WEATHER_FORECAST = 'WEATHER_FORECAST',
}

export interface CustomizeField {
  type: 'COLOR' | 'SWITCHER' | 'TEXT' | 'NUMBER';
  prop: string;
  label: string;
  options?: { label: string; value: string | number | boolean }[];
  defaultValue?: any;
}

export type WidgetConfig = {
  type: WidgetType;
  customizeFields: CustomizeField[];
};

export type IconType = {
  width?: number | string;
  height?: number | string;
};
