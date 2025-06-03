'use client';

import { useWidgetContext } from '@/contexts/WidgetContext';
import { WIDGET_CONFIGS } from '@/configs/widgetConfigs';
import CustomizeFieldComponent from './CustomizeFieldComponent';
import { useParams } from 'next/navigation';
import { Button } from './ui/button';
import { BadgePlus } from 'lucide-react';
import DividerWithLabel from './base/DividerWithLabel';
import WidgetCard from './WidgetCard';

const SecondarySidebar = () => {
  const { widgetId } = useParams() as { widgetId: string };

  const {
    selectedWidget,
    widgets,
    createWidget,
    updateWidget,
    deleteWidget,
    getWidgetsByType,
  } = useWidgetContext();

  const widgetConfig = WIDGET_CONFIGS[selectedWidget];

  const widgetsByType = getWidgetsByType(selectedWidget);

  const handleFieldChange = (prop: string, value: any) => {
    updateWidget(widgetId, { [prop]: value });
  };

  if (widgetId) {
    return (
      <div className="flex flex-col gap-10 w-80 border-r border-gray-200 h-screen p-4">
        {widgetConfig.customizeFields?.map((field) => (
          <CustomizeFieldComponent
            key={field.prop}
            field={field}
            value={widgets[widgetId].customValues?.[field.prop]}
            onChange={(val) => handleFieldChange(field.prop, val)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-80 border-r border-gray-200 h-screen p-4">
      <Button
        className="py-5 bg-blue-500 hover:bg-blue-400 transition-all duration-300"
        onClick={() => createWidget(selectedWidget)}
      >
        <BadgePlus /> Create New
      </Button>

      {widgetsByType.length > 0 && (
        <DividerWithLabel label="or continue with" />
      )}

      {widgetsByType.length > 0 && (
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
      )}
    </div>
  );
};

export default SecondarySidebar;
