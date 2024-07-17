'use client';
import { useEffect, useState } from 'react';
import WidgetCustomize from '@/app/components/customize-page/WidgetCustomize';
import WidgetPreview from '@/app/components/customize-page/WidgetPreview';
import {  CustomizeProps, Widget, WidgetType } from '@/app/types';
import { DIGITAL_CLOCK_CONFIG } from '@/app/configs/widget-configs';

const getWidgetData: (widgetType: WidgetType) => Widget = (widgetType) => {
  switch (widgetType) {
    case WidgetType.Digital_Clock:
      return DIGITAL_CLOCK_CONFIG;
    default:
      return { name: '', type: null, customizeItems: [] };
  }
};

export default function ComponentConfiguration() {
  const [widgetType, setWidgetType] = useState<WidgetType>(WidgetType.Digital_Clock);
  const [selectedWidget, setSelectedWidget] = useState<Widget>({
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
          onChange={changeCustomizeProps}
        />
      </aside>
    </div>
  );
}
