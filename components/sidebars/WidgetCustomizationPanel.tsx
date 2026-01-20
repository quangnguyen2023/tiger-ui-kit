import CustomizeFieldComponent from '@/components/CustomizeFieldComponent';
import { WIDGET_CONFIGS } from '@/configs/widgetConfigs';
import { Widget, WidgetType } from '@/types/widget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, SlidersHorizontal } from 'lucide-react';
import ChartDataSourceTab from '@/components/sidebars/tabs/ChartDataSourceTab';

type Props = {
  widgets: Record<string, Widget>;
  widgetId: string;
  widgetType: WidgetType;
  updateWidget: (widgetId: string, updates: Record<string, any>) => void;
};

const WidgetCustomizationPanel = ({
  widgets,
  widgetId,
  widgetType,
  updateWidget,
}: Props) => {
  const widgetConfig = WIDGET_CONFIGS[widgetType];
  const hasDataAdapter = !!widgetConfig.dataAdapter;
  const currentWidget = widgets[widgetId];

  const handleFieldChange = (prop: string, value: any) => {
    updateWidget(widgetId, {
      customValues: { [prop]: value },
    });
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

      <TabsContent value="data_source">
        {widgetType === WidgetType.CHART && (
          <ChartDataSourceTab widget={currentWidget} updateWidget={updateWidget} />
        )}
      </TabsContent>

      <TabsContent value="customize" className="overflow-y-auto">
        {renderCustomizeContent()}
      </TabsContent>
    </Tabs>
  );
};

export default WidgetCustomizationPanel;
