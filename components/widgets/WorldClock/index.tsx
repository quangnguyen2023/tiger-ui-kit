'use client';

import { SIZE } from './constants';
import LocationClock from './LocationClock';
import { getWidgetSize } from '@/configs/widgetSizes';
import { WidgetType } from '@/types/widget';

export interface Clock {
  location: string;
  timezone: string;
}

interface WorldClockProps {
  sizeVariant?: SIZE;
  tickInterval?: number;
  clocks?: Clock[];
}

export default function WorldClock({
  sizeVariant = SIZE.MEDIUM,
  tickInterval,
  clocks = [
    { location: 'New York', timezone: 'America/New_York' },
    { location: 'London', timezone: 'Europe/London' },
    { location: 'Tokyo', timezone: 'Asia/Tokyo' },
    { location: 'Sydney', timezone: 'Australia/Sydney' },
  ],
}: WorldClockProps) {
  const widgetSize = getWidgetSize(
    WidgetType.WORLD_CLOCK,
    sizeVariant === SIZE.SMALL ? 'compact' : 'default',
  );

  return (
    <div
      className={`relative grid w-max p-6 ${sizeVariant === SIZE.MEDIUM ? 'grid-cols-4 gap-8' : 'grid-cols-2 gap-5'} rounded-xl bg-[#1c1c1e] select-none`}
      style={{ width: widgetSize.width, height: widgetSize.height }}
    >
      {clocks.map((clock, index) => {
        const defaultLocation = clock.timezone.split('/').pop()?.replace('_', ' ');
        return (
          <LocationClock
            key={index}
            location={clock.location || defaultLocation}
            showDetail={sizeVariant === SIZE.MEDIUM}
            timezone={clock.timezone}
            tickInterval={tickInterval}
          />
        );
      })}
    </div>
  );
}
