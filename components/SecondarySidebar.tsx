'use client';

import { useWidgetContext } from '@/contexts/WidgetContext';
import { WIDGET_CONFIGS } from '@/configs/widgetConfigs';
import CustomizeFieldComponent from './CustomizeFieldComponent';

const SecondarySidebar = () => {
  const { selectedWidget, widgetProps, updateWidgetProps } = useWidgetContext();

  const widgetConfig = WIDGET_CONFIGS[selectedWidget];

  const handleFieldChange = (prop: string, value: any) => {
    updateWidgetProps?.(selectedWidget, { [prop]: value });
  };

  return (
    <div className="flex flex-col gap-10 w-80 border-r border-gray-200 h-screen p-4">
      {widgetConfig.customizeFields?.map((field) => (
        <CustomizeFieldComponent
          key={field.prop}
          field={field}
          value={widgetProps?.[selectedWidget]?.[field.prop]}
          onChange={(val) => handleFieldChange(field.prop, val)}
        />
      ))}
    </div>
  );
};

export default SecondarySidebar;
