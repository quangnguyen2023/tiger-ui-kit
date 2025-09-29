// import { CustomizeItem } from "./components/customize-page/WidgetCustomize/WidgetCustomize";

declare global {
  type TextFieldProps = {
    label: string;
    value?: string;
    placeholder?: string;
    helperText?: string;
    className?: string;
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

export type IconType = {
  width?: number | string;
  height?: number | string;
};
