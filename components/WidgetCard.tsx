import { SlidersVertical, SquaresExclude, X } from 'lucide-react';
import { Button } from './ui/button';
import { Widget } from '@/types/widget';

type WidgetCardProps = {
  widget: Widget;
  onDelete: (widgetId: string) => void;
};

const WidgetCard = ({ widget, onDelete }: WidgetCardProps) => {
  return (
    <div className="relative flex flex-col gap-4 border border-gray-200 p-4 py-3 rounded-lg">
      <div className="flex items-center gap-2 max-w-10/12">
        <SquaresExclude size="16" />
        <p className="text-sm font-medium text-gray-600 truncate">
          {widget.name || `Widget ${widget.id}`}
        </p>
      </div>

      <Button
        variant="outline"
        className="w-fit self-center"
        onClick={() => (window.location.href = `?widgetId=${widget.id}`)}
      >
        <SlidersVertical /> Customize
      </Button>

      <Button
        className="absolute top-1 right-1"
        variant="ghost"
        size="icon"
        onClick={() => onDelete(widget.id)}
      >
        <X />
      </Button>
    </div>
  );
};

export default WidgetCard;
