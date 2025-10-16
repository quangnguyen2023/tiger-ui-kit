export type ChartDataPoint = {
  label: string;
  value: number;
};

export type ChartWidgetProps = {
  title?: string;
  chartType?: 'line' | 'bar' | 'pie';
  backgroundColor?: string;
  accentColor?: string;
  textColor?: string;
  showLegend?: boolean;
  notionSecret?: string;
  notionDatabaseId?: string;
  labelField?: string;
  valueField?: string;
  maxItems?: number | string;
  notionFilterProperty?: string;
  notionFilterValue?: string;
  sortDirection?: 'asc' | 'desc';
};
