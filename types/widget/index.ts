export type Widget = {
  id: string;
  owner: string;
  type: WidgetType;
  customValues: Record<string, any>;
  createdAt?: string;
  name?: string;
};

export type WidgetConfig = {
  type: WidgetType;
  customizeFields: CustomizeField[];
};

export enum WidgetType {
  ANALOG_CLOCK = 'ANALOG_CLOCK',
  DIGITAL_CLOCK = 'DIGITAL_CLOCK',
  WORLD_CLOCK = 'WORLD_CLOCK',
  CALENDAR = 'CALENDAR',
  WEATHER_FORECAST = 'WEATHER_FORECAST',
}

export interface WidgetContextType {
  widgets: Record<string, Widget>;
  isLoadingWidgets: boolean;
  createWidget: (type: WidgetType) => Promise<string>;
  updateWidget: (widgetId: string, prop: Record<string, any>) => void;
  saveWidget: (widgetId: string) => Promise<void>;
  deleteWidget: (widgetId: string) => Promise<void>;
  getWidgetsByType: (type: WidgetType | string) => Promise<Widget[]>;
}

export type CustomizeFieldType =
  | 'COLOR'
  | 'SWITCHER'
  | 'TEXT'
  | 'NUMBER'
  | 'TIMEZONE'
  | 'DIVIDER'
  | 'ARRAY_EDITOR';

export interface BaseCustomizeField {
  prop: string;
  label: string;
  defaultValue?: any;
  hidden?: boolean; // Field sẽ không hiển thị trong UI nhưng vẫn được lưu
}

export interface StandardCustomizeField extends BaseCustomizeField {
  type: 'COLOR' | 'SWITCHER' | 'TEXT' | 'NUMBER' | 'TIMEZONE';
  options?: { label: string; value: string | number | boolean }[];
}

export interface SettingItem {
  key: string; // Key trong customValues
  label: string;
  type: 'text' | 'timezone' | 'color' | 'switch' | 'custom'; // Loại input
  defaultValue?: any;
  required?: boolean;
  customComponent?: string; // Tên component tùy chỉnh nếu type là 'custom'
  customProps?: Record<string, any>; // Props bổ sung cho component
}

export interface DividerField extends BaseCustomizeField {
  type: 'DIVIDER';
  text?: string; // Text hiển thị trên divider (tùy chọn)
  style?: 'solid' | 'dashed' | 'dotted'; // Kiểu đường kẻ
}

export interface ArrayEditorField extends BaseCustomizeField {
  type: 'ARRAY_EDITOR';
  itemSchema: Record<string, SettingItem>; // Định nghĩa schema cho mỗi item trong array
  maxItems?: number; // Số lượng item tối đa
  minItems?: number; // Số lượng item tối thiểu
  itemLabel?: string; // Label cho mỗi item (ví dụ: "Clock")
}

export type CustomizeField = StandardCustomizeField | DividerField | ArrayEditorField;

export interface SettingGroup {
  title: string;
  items: SettingItem[];
}
