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
    options: { label: string; value: string | number }[];
    selectedOption?: string | number;
    onChange?: (value: string | number) => void;
  };
}

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

// export type WidgetConfig = {
//   name: string;
//   type: WidgetType | null;
//   customizeItems: CustomizeItem[];
// };

export type CustomizeProps = {
  [key: string]: any;
};

export type IconType = {
  width?: number | string;
  height?: number | string;
};
