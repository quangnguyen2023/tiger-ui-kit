'use server';

import { Widget } from '@/types/widget';
import { cookies } from 'next/headers';

export const getExistingWidgets: () => Promise<
  Record<string, Widget>
> = async () => {
  const widgetsCookie = (await cookies()).get('widgets');
  return widgetsCookie ? JSON.parse(widgetsCookie.value) : {};
};

export const apiGetWidgetById = async (id: string) => {
  const widgets = await getExistingWidgets();
  return widgets[id];
};

export const apiCreateWidget = async (id: string, newWidget: Widget) => {
  const widgets = await getExistingWidgets();
  widgets[id] = newWidget;
  (await cookies()).set('widgets', JSON.stringify(widgets));
};

export const apiSaveWidget = async (id: string, updatedWidget: Widget) => {
  const widgets = await getExistingWidgets();
  widgets[id] = updatedWidget;
  (await cookies()).set('widgets', JSON.stringify(widgets));
};

export const apiDeleteWidget = async (id: string) => {
  const widgets = await getExistingWidgets();
  delete widgets[id];
  (await cookies()).set('widgets', JSON.stringify(widgets));
};
