'use client';
import WidgetCustomize from '@/app/components/customize-page/WidgetCustomize';
import {
  CustomizeItem,
  CustomizeItemType,
} from '@/app/components/customize-page/WidgetCustomize/WidgetCustomize';
import WidgetPreview from '@/app/components/customize-page/WidgetPreview';
import DigitalClock from '@/app/components/ui/DigitalClock';
import { ReactNode, useEffect, useState } from 'react';

enum WidgetType {
  Analog_Clock,
  Digital_Clock,
  World_Clock,
  Calendar,
  Weather_Forecast,
}

type Widget = {
  name: string;
  component: ReactNode;
  customizeItems: CustomizeItem[];
};

const getWidgetData: (widgetType: WidgetType) => Widget = (widgetType) => {
  switch (widgetType) {
    case WidgetType.Digital_Clock:
      return {
        name: 'Digital Clock',
        component: <DigitalClock />,
        customizeItems: [
          {
            title: 'Text Color',
            type: CustomizeItemType.COLOR,
          },
        ],
      };
    default:
      return { name: '', component: <></>, customizeItems: [] };
  }
};

export default function ComponentConfiguration() {
  const [widgetType, setWidgetType] = useState<WidgetType>(WidgetType.Digital_Clock);
  const [selectedWidget, setSelectedWidget] = useState<Widget>({
    name: '',
    component: <></>,
    customizeItems: [],
  });

  useEffect(() => {
    const widget = getWidgetData(widgetType);
    setSelectedWidget(widget);
  }, [widgetType]);

  return (
    <div className="grid h-dvh grid-cols-3 xl:grid-cols-4">
      <main className="col-span-2 p-5 xl:col-span-3">
        <WidgetPreview
          widgetName={selectedWidget.name}
          widgetComponent={selectedWidget.component}
        />
      </main>

      <aside className="bg-[#F5F7F8] p-5">
        <WidgetCustomize customizeItems={selectedWidget.customizeItems} />
      </aside>
    </div>
  );
}