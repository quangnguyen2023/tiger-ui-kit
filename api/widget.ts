// 'use server';

import axios from '@/lib/axios';
import { mapWidgetsArrToObj } from '@/mappers/widgetMapper';
import { Widget } from '@/types/widget';

export const getExistingWidgets: () => Promise<
  Record<string, Widget>
> = async () => {
  try {
    const res = await axios.get('/');
    return mapWidgetsArrToObj(res.data || []);
  } catch (err) {
    console.error('Error fetching existing widgets:', err);
    return {};
  }
};

export const apiGetWidgetById = async (id: string) => {
  const widgets = await getExistingWidgets();
  return widgets[id];
};

export const apiCreateWidget = async (newWidget: Omit<Widget, 'createdAt'>) => {
  console.log('🚀 ~ newWidget:', newWidget);
  try {
    await axios.post('/', newWidget);
  } catch (err) {
    console.error('Error creating widget:', err);
  }
};

export const apiSaveWidget = async (id: string, updatedWidget: Widget) => {
  try {
    await axios.patch(`/${id}`, updatedWidget);
  } catch (err) {
    console.error('Error saving widget:', err);
  }
};

export const apiDeleteWidget = async (id: string) => {
  try {
    const res = await axios.delete(`/${id}`);
    return res.data;
  } catch (err) {
    console.error('Error deleting widget:', err);
  }
};
