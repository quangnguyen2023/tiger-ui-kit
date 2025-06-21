'use client';

import { useWidgetContext } from '@/contexts/WidgetContext';
import { WIDGET_CONFIGS } from '@/configs/widgetConfigs';
import CustomizeFieldComponent from './CustomizeFieldComponent';
import { useParams, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { BadgePlus } from 'lucide-react';
import DividerWithLabel from './base/DividerWithLabel';
import WidgetCard from './WidgetCard';
import { WidgetType } from '@/types/widget';
import { useEffect, useState } from 'react';

const SecondarySidebar = () => {
  const { widgetId } = useParams() as { widgetId: string };
  const { push } = useRouter();

  const {
    widgets,
    isLoadingWidgets,
    createWidget,
    updateWidget,
    deleteWidget,
    getWidgetsByType,
    selectedWidget,
  } = useWidgetContext();

  const [isCreating, setIsCreating] = useState(false);

  const widgetConfig = WIDGET_CONFIGS[selectedWidget];
  const widgetsByType = getWidgetsByType(selectedWidget);

  const handleFieldChange = (prop: string, value: any) => {
    updateWidget(widgetId, { [prop]: value });
  };

  const handleCreateWidget = async (widgetType: WidgetType) => {
    try {
      setIsCreating(true);
      const newId = await createWidget(widgetType);
      await push(`/widget-customizer/${newId}`);
    } catch (err) {
      console.error('Error creating widget:', err);
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    // If the widget is not found, redirect to the widget creation page
    if (widgetId && !widgets[widgetId] && !isLoadingWidgets) {
      push('/widget-customizer');
    }
  }, [widgetId, widgets, isLoadingWidgets, push]);

  if (widgetId && !widgets[widgetId] && !isLoadingWidgets) {
    return null;
  }

  // If widgetId exists then showing the customization fields
  if (widgetId && widgets[widgetId]) {
    return (
      <div className="flex flex-col gap-10 w-80 border-r border-gray-200 h-screen p-4">
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
  }

  // If no widgetId, show the sidebar with options to create or select existing widgets
  return (
    <div className="flex flex-col gap-6 w-80 border-r border-gray-200 h-screen p-4">
      <Button
        className="py-5 bg-blue-500 hover:bg-blue-400 transition-all duration-300"
        onClick={() => handleCreateWidget(selectedWidget)}
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

export default SecondarySidebar;
