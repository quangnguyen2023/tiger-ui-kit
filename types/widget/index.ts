import { Dispatch, SetStateAction } from 'react';

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
  getWidgetsByType: (type: WidgetType) => Widget[];
}

export interface CustomizeField {
  type: 'COLOR' | 'SWITCHER' | 'TEXT' | 'NUMBER';
  prop: string;
  label: string;
  options?: { label: string; value: string | number | boolean }[];
  defaultValue?: any;
}

export type ClockWidgetConfig = {};
