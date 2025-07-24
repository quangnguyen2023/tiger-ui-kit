import { SlidersVertical, SquaresExclude, X } from 'lucide-react';
import { Button } from './ui/button';
import { Widget } from '@/types/widget';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type WidgetCardProps = {
  widget: Widget;
  onDelete: (widgetId: string) => void;
};

const WidgetCard = ({ widget, onDelete }: WidgetCardProps) => {
  const { push } = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCustomize = () => {
    setIsNavigating(true);
    push(`/widget-customizer/${widget.type}/${widget.id}`);
  };

  return (
    <div className="relative flex w-full max-w-xs flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 py-3">
      <div className="flex max-w-10/12 items-center gap-2">
        <SquaresExclude size="16" />
        <p className="truncate text-sm font-medium text-gray-600">
          {widget.name || `Widget ${widget.id}`}
        </p>
      </div>

      <Button
        variant="outline"
        className="w-fit self-center"
        onClick={handleCustomize}
        loading={isNavigating}
        startIcon={<SlidersVertical />}
      >
        Customize
      </Button>

      <Button
        className="absolute top-1 right-1"
        variant="ghost"
        size="icon"
        onClick={() => onDelete(widget.id)}
        disabled={isNavigating}
      >
        <X />
      </Button>
    </div>
  );
};

export default WidgetCard;
