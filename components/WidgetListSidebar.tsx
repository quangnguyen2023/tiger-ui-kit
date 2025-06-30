'use client';

import DividerWithLabel from '@/components/base/DividerWithLabel';
import { Button } from '@/components/ui/button';
import WidgetCard from '@/components/WidgetCard';
import { Widget, WidgetType } from '@/types/widget';
import { BadgePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type WidgetListSidebarProps = {
  widgetType: WidgetType;
  createWidget: (widgetType: WidgetType) => Promise<string>;
  deleteWidget: (widgetId: string) => Promise<void>;
  getWidgetsByType: (widgetType: WidgetType) => Promise<Widget[]>;
};

const WidgetListSidebar = ({
  widgetType,
  createWidget,
  deleteWidget,
  getWidgetsByType,
}: WidgetListSidebarProps) => {
  const { push } = useRouter();

  const [isCreating, setIsCreating] = useState(false);
  const [widgetsByType, setWidgetsByType] = useState<Widget[]>([]);

  useEffect(() => {
    const fetchWidgets = async () => {
      const widgets = await getWidgetsByType(widgetType);
      setWidgetsByType(widgets);
    };
    fetchWidgets();
  }, [widgetType]);

  const handleCreateWidget = async (widgetType: WidgetType) => {
    try {
      setIsCreating(true);
      const newId = await createWidget(widgetType);
      push(`/widget-customizer/${widgetType}/${newId}`);
    } catch (err) {
      console.error('Error creating widget:', err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-80 border-r border-gray-200 h-screen p-4">
      <Button
        className="py-5 bg-blue-500 hover:bg-blue-400 transition-all duration-300"
        onClick={() => handleCreateWidget(widgetType)}
        loading={isCreating}
        startIcon={<BadgePlus />}
      >
        Create New
      </Button>

      {widgetsByType.length > 0 && (
        <>
          <DividerWithLabel label="or continue with" />

          <div className="flex flex-col gap-4">
            <h5 className="font-medium text-gray-600">Existing Widgets</h5>
            {widgetsByType.map((widget) => (
              <WidgetCard
                key={widget.id}
                widget={widget}
                onDelete={deleteWidget}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WidgetListSidebar;
