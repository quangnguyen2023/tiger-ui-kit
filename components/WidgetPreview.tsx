'use client';

import { WidgetType } from '@/types';
import React from 'react';
import AnalogClock from './widgets/AnalogClock';
import DigitalClock from './widgets/DigitalClock';
import WeatherForecast from './widgets/WeatherForecast';
import WorldClock from './widgets/WorldClock';
import { useWidgetContext } from '@/contexts/WidgetContext';
import EmbedLink from './EmbedLink';

const WidgetPreview = () => {
  const { selectedWidget, widgetProps } = useWidgetContext();

  const renderWidget = () => {
    switch (selectedWidget) {
      case WidgetType.ANALOG_CLOCK:
        return <AnalogClock {...widgetProps?.[WidgetType.ANALOG_CLOCK]} />;
      case WidgetType.DIGITAL_CLOCK:
        return <DigitalClock {...widgetProps?.[WidgetType.DIGITAL_CLOCK]} />;
      case WidgetType.WORLD_CLOCK:
        return <WorldClock {...widgetProps?.[WidgetType.WORLD_CLOCK]} />;
      case WidgetType.WEATHER_FORECAST:
        return (
          <WeatherForecast {...widgetProps?.[WidgetType.WEATHER_FORECAST]} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 relative flex justify-center items-center">
      <div className="absolute top-6 z-10">
        <EmbedLink widgetType={selectedWidget} />
      </div>

      {renderWidget()}
    </div>
  );
};

export default WidgetPreview;
