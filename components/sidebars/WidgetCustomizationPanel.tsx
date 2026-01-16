import CustomizeFieldComponent from '@/components/CustomizeFieldComponent';
import { WIDGET_CONFIGS } from '@/configs/widgetConfigs';
import { Widget, WidgetType } from '@/types/widget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { v4 as uuidv4 } from 'uuid';
import {
  Database,
  ExternalLink,
  Plus,
  SlidersHorizontal,
  TableProperties,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import DataGrid, {
  CellClickArgs,
  CellMouseEvent,
  Column,
  textEditor,
  RenderEditCellProps,
} from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { NumericFormat } from 'react-number-format';

type Props = {
  widgets: Record<string, Widget>;
  widgetId: string;
  widgetType: WidgetType;
  updateWidget: (widgetId: string, updates: Record<string, any>) => void;
};

type ChartRow = {
  id: string;
  label: string;
  value: number | null;
};

// Generic Custom Number Editor with NumericFormat
function NumberEditor<TRow>({
  row,
  column,
  onRowChange,
  onClose,
}: RenderEditCellProps<TRow>) {
  const value = (row as any)[column.key];

  return (
    <NumericFormat
      className="h-full w-full border-none px-2 outline-none"
      value={value ?? ''}
      onValueChange={(values) => {
        onRowChange({ ...row, [column.key]: values.floatValue ?? null } as TRow);
      }}
      onBlur={() => onClose(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClose(true);
        } else if (e.key === 'Escape') {
          onClose(false);
        }
      }}
      allowNegative={true}
      decimalScale={2}
      placeholder="Enter number"
    />
  );
}

const WidgetCustomizationPanel = ({
  widgets,
  widgetId,
  widgetType,
  updateWidget,
}: Props) => {
  const widgetConfig = WIDGET_CONFIGS[widgetType];
  const hasDataAdapter = !!widgetConfig.dataAdapter;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Initialize chart data from widget or use default
  const [chartData, setChartData] = useState<ChartRow[]>(
    widgets[widgetId]?.dataSources?.chartData || [
      { id: uuidv4(), label: '', value: null },
      { id: uuidv4(), label: '', value: null },
      { id: uuidv4(), label: '', value: null },
    ],
  );

  const handleFieldChange = (prop: string, value: any) => {
    updateWidget(widgetId, {
      customValues: { [prop]: value },
    });
  };

  // Define columns for the data grid
  const columns: Column<ChartRow>[] = useMemo(
    () => [
      {
        key: 'label',
        name: 'Label',
        renderEditCell: textEditor,
      },
      {
        key: 'value',
        name: 'Value',
        renderEditCell: NumberEditor,
      },
    ],
    [],
  );

  const handleRowsChange = (rows: ChartRow[]) => {
    setChartData(rows);
    // Update widget with new chart data
    updateWidget(widgetId, {
      dataSources: { chartData: rows },
    });
  };

  const handleAddRow = () => {
    const newRow: ChartRow = {
      id: uuidv4(),
      label: ``,
      value: null,
    };
    const newData = [...chartData, newRow];
    setChartData(newData);
  };

  // const handleDeleteRow = (id: number) => {
  //   const newData = chartData.filter((row) => row.id !== id);
  //   setChartData(newData);
  //   updateWidget(widgetId, { chartData: newData });
  // };

  // Allow editing with single click
  const onCellClick = (args: CellClickArgs<ChartRow>, event: CellMouseEvent) => {
    event.preventGridDefault();
    args.selectCell(true);
  };

  // Render customize fields content
  const renderCustomizeContent = () => (
    <div className="flex w-full flex-col gap-10 p-4 pb-12">
      {widgetConfig.customizeFields?.map((field) => (
        <CustomizeFieldComponent
          key={field.prop}
          field={field}
          value={widgets[widgetId]?.customValues?.[field.prop]}
          onChange={(val) => handleFieldChange(field.prop, val)}
        />
      ))}
    </div>
  );

  // If no dataAdapter, show only customize content without tabs
  if (!hasDataAdapter) {
    return (
      <div className="h-full w-full overflow-y-auto">{renderCustomizeContent()}</div>
    );
  }

  // If has dataAdapter, show tabs with data source and customize
  return (
    <Tabs defaultValue="data_source" className="h-full w-full">
      <TabsList className="mx-auto my-3 flex w-fit *:cursor-pointer">
        <TabsTrigger value="data_source" className="flex-1">
          <Database /> Data Source
        </TabsTrigger>
        <TabsTrigger value="customize" className="flex-1">
          <SlidersHorizontal /> Customize
        </TabsTrigger>
      </TabsList>

      <TabsContent value="data_source" className="p-4 pb-12">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <TableProperties color="blue" size={20} />
          Manual data entry
        </h1>
        <p className="mt-5 mb-8 text-sm text-gray-500">
          Create and modify your chart data directly. Changes will be reflected in the
          preview.
        </p>

        <Button
          className="w-full bg-blue-500 py-5 hover:bg-blue-400"
          onClick={() => setIsDialogOpen(true)}
        >
          <ExternalLink /> Open data entry table
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <TableProperties className="h-5 w-5 text-blue-500" />
                Data Entry Table
              </DialogTitle>
              <DialogDescription>
                Enter your chart data below. You can add labels and values for your chart.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <div className="mb-4 flex gap-2">
                <Button
                  onClick={handleAddRow}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Row
                </Button>
              </div>

              <div>
                <style>{`
                  .rdg-cell {
                    cursor: text;
                  }
                  .rdg-cell:nth-child(1) {
                    border-right: 1px solid #ddd;
                  }
                `}</style>

                <DataGrid
                  columns={columns}
                  rows={chartData}
                  onRowsChange={handleRowsChange}
                  rowKeyGetter={(row) => row.id}
                  onCellClick={onCellClick}
                  className="rdg-light rounded-lg"
                />
              </div>

              {/* <div className="mt-4">
                <h3 className="mb-2 text-sm font-medium">Delete Rows</h3>
                <div className="flex max-h-32 flex-col gap-1 overflow-y-auto">
                  {chartData.map((row) => (
                    <div
                      key={row.id}
                      className="flex items-center justify-between rounded border p-2 text-sm"
                    >
                      <span>
                        {row.label}: {row.value}
                      </span>
                      <Button
                        onClick={() => handleDeleteRow(row.id)}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </DialogContent>
        </Dialog>
      </TabsContent>

      <TabsContent value="customize" className="overflow-y-auto">
        {renderCustomizeContent()}
      </TabsContent>
    </Tabs>
  );
};

export default WidgetCustomizationPanel;
