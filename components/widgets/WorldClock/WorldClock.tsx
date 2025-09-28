'use client';

import { useState } from 'react';
import { SIZE } from './constants';
import LocationClock from './LocationClock';
import { getWidgetSize } from '@/configs/widgetSizes';
import { WidgetType } from '@/types/widget';

interface WorldClockProps {
  textColor?: string;
  timezone1?: string;
  timezone2?: string;
  timezone3?: string;
  timezone4?: string;
  location1?: string;
  location2?: string;
  location3?: string;
  location4?: string;
}

export default function WorldClock({
  textColor = '#000',
  timezone1 = 'America/New_York',
  timezone2 = 'Asia/Tokyo',
  timezone3 = 'Europe/London',
  timezone4 = 'Australia/Sydney',
  location1 = 'New York',
  location2 = 'Tokyo',
  location3 = 'London',
  location4 = 'Sydney',
}: WorldClockProps) {
  const [selectedSize, setSelectedSize] = useState<SIZE>(SIZE.MEDIUM);

  const size = getWidgetSize(WidgetType.WORLD_CLOCK);

  return (
    <div
      className={`relative grid w-max p-6 ${selectedSize === SIZE.MEDIUM ? 'grid-cols-4 gap-8' : 'grid-cols-2 gap-5'} rounded-xl bg-[#1c1c1e] select-none`}
      style={{ width: size.width, height: size.height }}
    >
      <LocationClock
        location={location1}
        detailedLocation={selectedSize === SIZE.MEDIUM}
        timezone={timezone1}
      />
      <LocationClock
        location={location2}
        detailedLocation={selectedSize === SIZE.MEDIUM}
        timezone={timezone2}
      />
      <LocationClock
        location={location3}
        detailedLocation={selectedSize === SIZE.MEDIUM}
        timezone={timezone3}
      />
      <LocationClock
        location={location4}
        detailedLocation={selectedSize === SIZE.MEDIUM}
        timezone={timezone4}
      />
    </div>
  );
}
