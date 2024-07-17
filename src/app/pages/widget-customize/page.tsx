'use client';
import { useEffect, useState } from 'react';
import WidgetCustomize from '@/app/components/customize-page/WidgetCustomize';
import WidgetPreview from '@/app/components/customize-page/WidgetPreview';
import {  CustomizeProps, WidgetConfig, WidgetType } from '@/app/types';
import { ANALOG_CLOCK_CONFIG, DIGITAL_CLOCK_CONFIG } from '@/app/configs/widget-configs';

const getWidgetData: (widgetType: WidgetType) => WidgetConfig = (widgetType) => {
  switch (widgetType) {
    case WidgetType.Digital_Clock:
      return DIGITAL_CLOCK_CONFIG;
    case WidgetType.Analog_Clock:
      return ANALOG_CLOCK_CONFIG;
    default:
      return { name: '', type: null, customizeItems: [] };
  }
};

export default function ComponentConfiguration() {
  const [widgetType, setWidgetType] = useState<WidgetType>(WidgetType.Analog_Clock);
  const [selectedWidget, setSelectedWidget] = useState<WidgetConfig>({
    name: '',
    type: null,
    customizeItems: [],
  });
  const [customizeProps, setCustomizeProps] = useState<CustomizeProps | any>();

  const changeCustomizeProps = (newProps: CustomizeProps) => {
    setCustomizeProps((prev: any) => ({ ...prev, ...newProps }));
  };

  useEffect(() => {
    const widget = getWidgetData(widgetType);
    setSelectedWidget(widget);
  }, [widgetType]);

  return (
    <div className="grid h-dvh grid-cols-3 xl:grid-cols-4 overflow-hidden">
      <main className="col-span-2 p-5 xl:col-span-3">
        <WidgetPreview
          widgetName={selectedWidget.name}
          widgetType={selectedWidget.type}
          customizeProps={customizeProps}
        />
      </main>

      <aside className="bg-[#F5F7F8] p-5 overflow-auto">
        <WidgetCustomize
          customizeItems={selectedWidget.customizeItems}
          handleChange={changeCustomizeProps}
        />
      </aside>
    </div>
  );
}
