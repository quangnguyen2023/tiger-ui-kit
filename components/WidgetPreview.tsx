'use client';

import { WidgetType } from '@/types/widget';
import React from 'react';
import AnalogClock from './widgets/AnalogClock';
import DigitalClock from './widgets/DigitalClock';
import WeatherForecast from './widgets/WeatherForecast';
import WorldClock from './widgets/WorldClock';
import { useWidgetContext } from '@/contexts/WidgetContext';
import EmbedLink from './EmbedLink';
import { useParams } from 'next/navigation';

const WidgetPreview = () => {
  const { widgets } = useWidgetContext();
  const { widgetId } = useParams() as { widgetId: string };
  const currentWidget = widgets[widgetId];

  const renderWidget = () => {
    switch (currentWidget?.type) {
      case WidgetType.ANALOG_CLOCK:
        return <AnalogClock {...currentWidget?.customValues} />;
      case WidgetType.DIGITAL_CLOCK:
        return <DigitalClock {...currentWidget?.customValues} />;
      case WidgetType.WORLD_CLOCK:
        return <WorldClock {...currentWidget?.customValues} />;
      case WidgetType.WEATHER_FORECAST:
        return <WeatherForecast {...currentWidget?.customValues} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 relative flex justify-center items-center">
      <div className="absolute top-6 z-10">
        <EmbedLink widgetType={currentWidget} />
      </div>

      {renderWidget()}
    </div>
  );
};

export default WidgetPreview;
