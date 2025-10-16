import { PIE_PALETTE } from '@/components/widgets/Chart/constants';
import { ChartDataPoint } from '@/components/widgets/Chart/types';
import { hexToRGBA } from '@/components/widgets/Chart/utils';
import { getWidgetSize } from '@/configs/widgetSizes';
import { WidgetType } from '@/types/widget';
import {
  Chart as ChartJS,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler,
  ArcElement,
} from 'chart.js';
import React, { useMemo } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Filler,
);

const SAMPLE_DATA: ChartDataPoint[] = [
  { label: 'Mon', value: 5 },
  { label: 'Tue', value: 8 },
  { label: 'Wed', value: 6 },
  { label: 'Thu', value: 10 },
  { label: 'Fri', value: 7 },
  { label: 'Sat', value: 4 },
  { label: 'Sun', value: 9 },
];

enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
}

type ChartProps = {
  chartType?: ChartType;
  accentColor?: string;
  textColor?: string;
  [key: string]: any;
};

const CHART_COMPONENTS = {
  line: Line,
  bar: Bar,
  pie: Pie,
};

const Chart = ({
  chartType = ChartType.LINE,
  textColor = '#0f172a',
  accentColor = '#6366f1',
}: ChartProps) => {
  const widgetSize = getWidgetSize(WidgetType.CHART);

  const [dataPoints, setDataPoints] = React.useState<ChartDataPoint[]>(SAMPLE_DATA);

  const ChartComponent = CHART_COMPONENTS[chartType] || Line;

  const chartData = useMemo(() => {
    const labels = dataPoints.map((point) => point.label);
    const values = dataPoints.map((point) => point.value);

    return {
      labels,
      datasets: [
        {
          label: 'dataset 1',
          data: values,
          backgroundColor:
            chartType === 'pie'
              ? values.map((_, index) => PIE_PALETTE[index % PIE_PALETTE.length])
              : chartType === 'bar'
                ? hexToRGBA(accentColor, 0.35)
                : hexToRGBA(accentColor, 0.2),
          // borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          // borderDash: [5, 5],
        },
      ],
    };
  }, [dataPoints, chartType, accentColor]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position:
            chartType === ChartType.PIE ? ('right' as const) : ('bottom' as const),
          labels: {
            color: '#374151',
            boxWidth: 20,
            usePointStyle: true,
            pointStyle: 'circle' as const,
            padding: 15,
            textAlign: 'center' as const,
          },
        },
        tooltip: {
          intersect: false,
        },
      },
    }),
    [chartType, textColor, accentColor],
  );

  return (
    <div
      className="flex items-center justify-center"
      style={{ height: widgetSize.height, width: widgetSize.width }}
    >
      <ChartComponent data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
