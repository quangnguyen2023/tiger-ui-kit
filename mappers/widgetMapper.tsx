import { Widget } from '@/types/widget';

export function mapWidgetsArrToObj(widgets: Widget[]): Record<string, Widget> {
  return widgets.reduce((acc, widget) => {
    acc[widget.id] = widget;
    return acc;
  }, {} as Record<string, Widget>);
}
