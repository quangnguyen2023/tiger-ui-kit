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
    push(`/widget-customizer/${widget.id}`);
  };

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
        onClick={handleCustomize}
        loading={isNavigating}
      >
        <SlidersVertical /> Customize
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
