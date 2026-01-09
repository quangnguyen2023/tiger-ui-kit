'use client';

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
import React, { useMemo, useState } from 'react';
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
  dataPoints?: ChartDataPoint[];
  accentColor?: string;
  textColor?: string;
  backgroundColor?: string;
  showLegend?: boolean;
  title?: string;
};

const CHART_COMPONENTS = {
  line: Line,
  bar: Bar,
  pie: Pie,
};

const Chart = ({
  chartType = ChartType.LINE,
  dataPoints = SAMPLE_DATA,
  textColor = '#0f172a',
  accentColor = '#6366f1',
  backgroundColor = '#ffffff',
  showLegend = true,
  title = 'Chart',
}: ChartProps) => {
  const widgetSize = getWidgetSize(WidgetType.CHART);

  const ChartComponent = CHART_COMPONENTS[chartType] || Line;

  const chartData = useMemo(() => {
    const labels = dataPoints.map((point) => point.label);
    const values = dataPoints.map((point) => point.value);

    return {
      labels,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor:
            chartType === 'pie'
              ? values.map((_, index) => PIE_PALETTE[index % PIE_PALETTE.length])
              : chartType === 'bar'
                ? hexToRGBA(accentColor, 0.35)
                : hexToRGBA(accentColor, 0.2),
          // borderColor: accentColor,
          borderWidth: 2,
          fill: chartType === 'line',
          tension: 0.35,
        },
      ],
    };
  }, [dataPoints, chartType, accentColor, title]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: showLegend,
          position:
            chartType === ChartType.PIE ? ('right' as const) : ('bottom' as const),
          labels: {
            color: textColor,
            boxWidth: 14,
            usePointStyle: true,
            pointStyle: 'circle' as const,
            padding: 15,
          },
        },
        tooltip: {
          intersect: false,
          mode: 'index' as const,
        },
      },
      scales:
        chartType === ChartType.PIE
          ? undefined
          : {
              x: {
                ticks: { color: textColor },
                grid: { color: 'rgba(148, 163, 184, 0.15)' },
              },
              y: {
                beginAtZero: true,
                ticks: { color: textColor },
                grid: { color: 'rgba(148, 163, 184, 0.2)' },
              },
            },
    }),
    [chartType, textColor, showLegend],
  );

  //
  // ------ Render loading state ---------
  //
  // if (isLoading) {
  //   return (
  //     <div
  //       className="flex items-center justify-center"
  //       style={{
  //         height: widgetSize.height,
  //         width: widgetSize.width,
  //         backgroundColor,
  //       }}
  //     >
  //       <div className="text-center">
  //         <div className="mb-2 text-sm font-medium" style={{ color: textColor }}>
  //           Loading data...
  //         </div>
  //         <div className="text-xs text-slate-400">Fetching from Notion</div>
  //       </div>
  //     </div>
  //   );
  // }

  //
  // ------ Render error state ---------
  //
  // if (error) {
  //   return (
  //     <div
  //       className="flex items-center justify-center p-6"
  //       style={{
  //         height: widgetSize.height,
  //         width: widgetSize.width,
  //         backgroundColor,
  //       }}
  //     >
  //       <div className="text-center">
  //         <div className="mb-2 text-sm font-medium text-red-600">Error</div>
  //         <div className="text-xs text-slate-500">{error}</div>
  //       </div>
  //     </div>
  //   );
  // }

  //
  // ------ Render empty state ---------
  //
  // if (dataPoints.length === 0) {
  //   return (
  //     <div
  //       className="flex items-center justify-center p-6"
  //       style={{
  //         height: widgetSize.height,
  //         width: widgetSize.width,
  //         backgroundColor,
  //       }}
  //     >
  //       <div className="text-center">
  //         <div className="mb-2 text-sm font-medium" style={{ color: textColor }}>
  //           No data available
  //         </div>
  //         <div className="text-xs text-slate-400">'Connect to a data source'</div>
  //       </div>
  //     </div>
  //   );
  // }

  //
  // ------- Render chart ---------
  //
  return (
    <div
      className="flex items-center justify-center p-4"
      style={{
        height: widgetSize.height,
        width: widgetSize.width,
        backgroundColor,
      }}
    >
      <ChartComponent data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
