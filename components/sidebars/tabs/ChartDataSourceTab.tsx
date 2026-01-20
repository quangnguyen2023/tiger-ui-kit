'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Widget } from '@/types/widget';
import { v4 as uuidv4 } from 'uuid';
import { ExternalLink, Plus, TableProperties } from 'lucide-react';
import { useState, useMemo } from 'react';
import DataGrid, {
  CellClickArgs,
  CellMouseEvent,
  Column,
  textEditor,
  RenderEditCellProps,
} from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { NumericFormat } from 'react-number-format';

type ChartRow = {
  id: string;
  label: string;
  value: number | null;
};

type Props = {
  widget: Widget;
  updateWidget: (widgetId: string, updates: Record<string, any>) => void;
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
      thousandSeparator
      autoFocus
    />
  );
}

const ChartDataSourceTab = ({ widget, updateWidget }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Initialize chart data from widget or use default
  const [chartData, setChartData] = useState<ChartRow[]>(
    widget?.dataSources?.chartData || [
      { id: uuidv4(), label: 'jan', value: 1 },
      { id: uuidv4(), label: 'feb', value: 2 },
      { id: uuidv4(), label: 'mar', value: 3 },
      { id: uuidv4(), label: 'apr', value: 4 },
    ],
  );

  const [selectedPosition, setSelectedPosition] = useState<{
    idx: number;
    rowIdx: number;
  } | null>(null);

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
        renderCell: ({ row }) => {
          if (row.value === null) return null;
          return new Intl.NumberFormat('en-US').format(row.value);
        },
      },
    ],
    [],
  );

  const handleRowsChange = (rows: ChartRow[], data: any) => {
    setChartData(rows);
    // Update widget with new chart data
    updateWidget(widget.id, {
      dataSources: { chartData: rows },
    });
  };

  const handleNativePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text');
    if (!clipboardData || !selectedPosition) return;

    const rows = clipboardData.split(/\r\n|\n|\r/);
    const { idx: startColIdx, rowIdx: startRowIdx } = selectedPosition;
    
    let newChartData = [...chartData];

    rows.forEach((rowStr, rIndex) => {
      if (!rowStr.trim()) return;
      
      const targetRowIdx = startRowIdx + rIndex;
      const cells = rowStr.split('\t');

      // Expand rows if necessary
      if (targetRowIdx >= newChartData.length) {
        newChartData.push({
            id: uuidv4(),
            label: '',
            value: null,
        });
      }

      // Clone the row if it exists to avoid mutating state directly
      const targetRow = { ...newChartData[targetRowIdx] };

      cells.forEach((cellValue, cIndex) => {
        const targetColIdx = startColIdx + cIndex;
        if (targetColIdx >= columns.length) return;

        const column = columns[targetColIdx];
        
        if (column.key === 'label') {
          targetRow.label = cellValue.trim();
        } else if (column.key === 'value') {
          const num = Number(cellValue.replace(/,/g, '').trim());
          targetRow.value = isNaN(num) ? null : num;
        }
      });
      
      // Update the row in the array
      newChartData[targetRowIdx] = targetRow;
    });

    setChartData(newChartData);
    updateWidget(widget.id, {
      dataSources: { chartData: newChartData },
    });
  };

  const onSelectedCellChange = (args: { rowIdx: number; column: Column<ChartRow> & { idx: number } }) => {
     setSelectedPosition({ rowIdx: args.rowIdx, idx: args.column.idx });
  };


  const handleAddRow = () => {
    const newRow: ChartRow = {
      id: uuidv4(),
      label: '',
      value: null,
    };
    const newData = [...chartData, newRow];
    setChartData(newData);
  };

  // Allow editing with single click
  const onCellClick = (args: CellClickArgs<ChartRow>, event: CellMouseEvent) => {
    event.preventGridDefault();
    args.selectCell(true);
  };

  return (
    <div className="p-4 pb-12">
      <h1 className="flex items-center gap-2 text-xl font-semibold">
        <TableProperties color="blue" size={20} />
        Manual data entry
      </h1>
      <p className="mb-8 mt-5 text-sm text-gray-500">
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
          <DialogContent 
           className="max-h-[80vh] max-w-4xl overflow-y-auto"
           onPasteCapture={handleNativePaste}
        >
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
                onSelectedCellChange={onSelectedCellChange}
                className="rdg-light rounded-lg"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChartDataSourceTab;
