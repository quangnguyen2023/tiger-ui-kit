'use server';

import { Widget } from '@/types/widget';
import { cookies } from 'next/headers';

export const getExistingWidgets: () => Record<string, Widget> = () => {
  const widgetsCookie = cookies().get('widgets');
  return widgetsCookie ? JSON.parse(widgetsCookie.value) : {};
};

export const apiCreateWidget = async (id: string, newWidget: Widget) => {
  const widgets = await getExistingWidgets();
  console.log('existing widgets:', widgets);
  widgets[id] = newWidget;
  console.log('updated widgets:', widgets);
  cookies().set('widgets', JSON.stringify(widgets));
};

export const apiSaveWidget = async (id: string, updatedWidget: Widget) => {
  const widgets = await getExistingWidgets();
  widgets[id] = updatedWidget;
  cookies().set('widgets', JSON.stringify(widgets));
};

export const apiDeleteWidget = async (id: string) => {
  const widgets = await getExistingWidgets();
  delete widgets[id];
  cookies().set('widgets', JSON.stringify(widgets));
};
