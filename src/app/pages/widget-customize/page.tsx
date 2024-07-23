'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import WidgetCustomize from '@/app/components/customize-page/WidgetCustomize';
import WidgetPreview from '@/app/components/customize-page/WidgetPreview';
import { CustomizeProps, WidgetConfig, WidgetType } from '@/app/types';
import {
  ANALOG_CLOCK_CONFIG,
  CALENDAR_CONFIG,
  DIGITAL_CLOCK_CONFIG,
  WEATHER_FORECAST_CONFIG,
  WORLD_CLOCK_CONFIG,
} from '@/app/configs/widget-configs';

const getWidgetData: (widgetType: WidgetType) => WidgetConfig = (widgetType) => {
  switch (widgetType) {
    case WidgetType.Digital_Clock:
      return DIGITAL_CLOCK_CONFIG;
    case WidgetType.Analog_Clock:
      return ANALOG_CLOCK_CONFIG;
    case WidgetType.Calendar:
      return CALENDAR_CONFIG;
    case WidgetType.Weather_Forecast:
      return WEATHER_FORECAST_CONFIG;
    case WidgetType.World_Clock:
      return WORLD_CLOCK_CONFIG;
    default:
      return { name: '', type: null, customizeItems: [] };
  }
};

function getInitialWidgetConfigs(widgetConfig: WidgetConfig) {
  const { customizeItems } = widgetConfig;

  return customizeItems.reduce((acc, item) => {
    return {
      ...acc,
      [item.fieldName]: item.defaultValue,
    };
  }, {});
}

export default function ComponentConfiguration() {
  const [widgetType, setWidgetType] = useState<WidgetType>(WidgetType.Weather_Forecast);
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>({
    name: '',
    type: null,
    customizeItems: [],
  });
  const [customizeProps, setCustomizeProps] = useState<CustomizeProps | any>();

  const changeCustomizeProps = (newProps: CustomizeProps) => {
    setCustomizeProps((prev: any) => ({ ...prev, ...newProps }));
  };

  const saveNewCustomizeProps = () => {
    Cookies.set('customizeProps', JSON.stringify(customizeProps));
  };

  useEffect(() => {
    const widget = getWidgetData(widgetType);
    setWidgetConfig(widget);
  }, [widgetType]);

  useEffect(() => {
    setCustomizeProps(getInitialWidgetConfigs(widgetConfig));
  }, [widgetConfig]);

  return (
    <div className="grid h-dvh grid-cols-3 xl:grid-cols-4 overflow-hidden">
      <main className="col-span-2 flex flex-col space-y-6 p-5 xl:col-span-3">
        <WidgetPreview
          widgetName={widgetConfig.name}
          widgetType={widgetConfig.type}
          customizeProps={customizeProps}
        />
      </main>

      <aside className="bg-[#F5F7F8] p-5 overflow-auto">
        <WidgetCustomize
          customizeItems={widgetConfig.customizeItems}
          handleChange={changeCustomizeProps}
          handleSave={saveNewCustomizeProps}
        />
      </aside>
    </div>
  );
}
