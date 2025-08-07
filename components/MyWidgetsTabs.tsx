'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WidgetCard from '@/components/WidgetCard';
import { useWidgetContext } from '@/contexts/WidgetContext';
import { Widget, WidgetType } from '@/types/widget';
import { useEffect, useState } from 'react';

const TABS = [
  { value: 'all', label: 'All' },
  { value: WidgetType.ANALOG_CLOCK, label: 'Analog Clock' },
  { value: WidgetType.DIGITAL_CLOCK, label: 'Digital Clock' },
  { value: WidgetType.WORLD_CLOCK, label: 'World Clock' },
  { value: WidgetType.WEATHER_FORECAST, label: 'Weather Forecast' },
  { value: WidgetType.CALENDAR, label: 'Calendar' },
];

const MyWidgetsTabs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const { getWidgetsByType, deleteWidget } = useWidgetContext();

  useEffect(() => {
    const fetchWidgets = async () => {
      const widgetsByType = await getWidgetsByType(activeTab);
      setWidgets(widgetsByType);
    };
    fetchWidgets();
  }, [activeTab, getWidgetsByType]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs defaultValue="all" className="items-center">
      <TabsList className="mb-8 *:p-4">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            onClick={() => handleTabChange(tab.value)}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {TABS.map((tab) => (
        <TabsContent
          className="flex max-h-fit flex-wrap items-center gap-3 sm:w-2xl xl:w-5xl"
          value={tab.value}
          key={tab.value}
        >
          {widgets.map((widget) => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              onDelete={() => deleteWidget(widget.id)}
            />
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MyWidgetsTabs;
