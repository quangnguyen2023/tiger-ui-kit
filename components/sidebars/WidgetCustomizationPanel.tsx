import CustomizeFieldComponent from '@/components/CustomizeFieldComponent';
import { WIDGET_CONFIGS } from '@/configs/widgetConfigs';
import { Widget, WidgetType } from '@/types/widget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, SlidersHorizontal } from 'lucide-react';

type Props = {
  widgets: Record<string, Widget>;
  widgetId: string;
  widgetType: WidgetType;
  updateWidget: (widgetId: string, prop: Record<string, any>) => void;
};

const WidgetCustomizationPanel = ({
  widgets,
  widgetId,
  widgetType,
  updateWidget,
}: Props) => {
  const widgetConfig = WIDGET_CONFIGS[widgetType];

  const handleFieldChange = (prop: string, value: any) => {
    updateWidget(widgetId, { [prop]: value });
  };

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

      <TabsContent value="data_source" className="p-4 pb-12"></TabsContent>

      <TabsContent
        value="customize"
        className="flex w-full flex-col gap-10 overflow-y-auto p-4 pb-12"
      >
        {widgetConfig.customizeFields?.map((field) => (
          <CustomizeFieldComponent
            key={field.prop}
            field={field}
            value={widgets[widgetId]?.customValues?.[field.prop]}
            onChange={(val) => handleFieldChange(field.prop, val)}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default WidgetCustomizationPanel;
