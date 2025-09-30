'use client';

import { useState } from 'react';
import { SIZE } from './constants';
import LocationClock from './LocationClock';
import { getWidgetSize } from '@/configs/widgetSizes';
import { WidgetType } from '@/types/widget';

export interface Clock {
  location: string;
  timezone: string;
}

interface WorldClockProps {
  textColor?: string;
  clocks?: Clock[];
}

export default function WorldClock({
  textColor = '#000',
  clocks = [
    { location: 'New York', timezone: 'America/New_York' },
    { location: 'London', timezone: 'Europe/London' },
    { location: 'Tokyo', timezone: 'Asia/Tokyo' },
    { location: 'Sydney', timezone: 'Australia/Sydney' },
  ],
}: WorldClockProps) {
  const [selectedSize, setSelectedSize] = useState<SIZE>(SIZE.MEDIUM);
  const size = getWidgetSize(WidgetType.WORLD_CLOCK);

  return (
    <div
      className={`relative grid w-max p-6 ${selectedSize === SIZE.MEDIUM ? 'grid-cols-4 gap-8' : 'grid-cols-2 gap-5'} rounded-xl bg-[#1c1c1e] select-none`}
      style={{ width: size.width, height: size.height }}
    >
      {clocks.map((clock, index) => {
        const defaultLocation = clock.timezone.split('/').pop()?.replace('_', ' ');
        return (
          <LocationClock
            key={index}
            location={clock.location || defaultLocation}
            detailedLocation={selectedSize === SIZE.MEDIUM}
            timezone={clock.timezone}
          />
        );
      })}
    </div>
  );
}
