'use client';

import { useState } from 'react';
import { SIZE } from './constants';
import LocationClock from './LocationClock';

const DEFAULT_TIMEZONES = [
  'America/New_York',
  'Asia/Tokyo',
  'Europe/London',
  'Australia/Sydney',
];

export default function WorldClock() {
  const [selectedSize, setSelectedSize] = useState<SIZE>(SIZE.MEDIUM);
  // Có thể thay bằng state cho phép user chọn
  const [timezones] = useState<string[]>(DEFAULT_TIMEZONES);

  return (
    // <div className="w-fit rounded-xl bg-blue-300 p-6">
    <div
      className={`relative grid w-max p-6 ${selectedSize === SIZE.MEDIUM ? 'grid-cols-4 gap-8' : 'grid-cols-2 gap-5'} rounded-xl bg-[#1c1c1e]`}
    >
      <LocationClock
        location="New York"
        isLightMode={false}
        detailedLocation={selectedSize === SIZE.MEDIUM}
        timezone={timezones[0]}
      />
      <LocationClock
        location="Tokyo"
        detailedLocation={selectedSize === SIZE.MEDIUM}
        timezone={timezones[1]}
      />
      <LocationClock
        location="London"
        detailedLocation={selectedSize === SIZE.MEDIUM}
        timezone={timezones[2]}
      />
      <LocationClock
        location="Sydney"
        detailedLocation={selectedSize === SIZE.MEDIUM}
        timezone={timezones[3]}
      />
    </div>

    // <div className="mt-5 flex items-center justify-center gap-5 font-semibold text-slate-400 *:cursor-pointer">
    //   <div
    //     className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-400 ${selectedSize === 'small' && 'border-white bg-white text-yellow-800'}`}
    //     onClick={() => setSelectedSize(SIZE.SMALL)}
    //   >
    //     <span>S</span>
    //   </div>

    //   <div
    //     className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-400 ${selectedSize === 'medium' && 'border-white bg-white text-yellow-800'}`}
    //     onClick={() => setSelectedSize(SIZE.MEDIUM)}
    //   >
    //     <span>M</span>
    //   </div>
    // </div>
    // </div>
  );
}
