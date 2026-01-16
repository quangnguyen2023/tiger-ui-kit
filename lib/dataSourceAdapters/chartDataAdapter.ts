import { Widget } from '@/types/widget';

export const chartDataAdapter = (widget: Widget) => {
  const chartData = widget?.dataSources?.chartData || [];
  return {
    dataPoints: chartData.reduce((result: any[], dataPoint: any) => {
      if (!dataPoint.label.trim() || dataPoint.value === null) {
        return result;
      }

      const point = {
        label: dataPoint.label,
        value: dataPoint.value || 0,
      };
      return [...result, point];
    }, []),
  };
};
