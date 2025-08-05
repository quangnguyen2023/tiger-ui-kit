import CustomizeFieldComponent from '@/components/CustomizeFieldComponent';
import { WIDGET_CONFIGS } from '@/configs/widgetConfigs';
import { Widget, WidgetType } from '@/types/widget';

type Props = {
  widgets: Record<string, Widget>;
  widgetId: string;
  widgetType: WidgetType;
  updateWidget: (widgetId: string, prop: Record<string, any>) => void;
};

const WidgetCustomizerSidebar = ({
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
};

export default WidgetCustomizerSidebar;
