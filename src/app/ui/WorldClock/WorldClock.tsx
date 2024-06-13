import { useState } from 'react';
import { SIZE } from './constants';
import LocationClock from './LocationClock';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function WorldClock() {
  const [selectedSize, setSelectedSize] = useState<SIZE>(SIZE.MEDIUM);

  return (
    <div className="w-fit p-6 rounded-xl bg-yellow-800 ">
      <div
        className={`relative p-6 grid ${selectedSize === SIZE.MEDIUM ? 'grid-cols-4 gap-8' : 'grid-cols-2 gap-5'} bg-[#1c1c1e] rounded-xl`}
      >
        <LocationClock
          location="New York"
          isLightMode={false}
          detailedLocation={selectedSize === SIZE.MEDIUM}
        />
        <LocationClock location="Tokyo" detailedLocation={selectedSize === SIZE.MEDIUM} />
        <LocationClock location="London" detailedLocation={selectedSize === SIZE.MEDIUM} />
        <LocationClock location="Sydney" detailedLocation={selectedSize === SIZE.MEDIUM} />

        <div
          className={`${selectedSize === SIZE.SMALL && 'hidden'} absolute -top-1 -left-1 w-7 h-7 p-1 bg-[#30d649] text-white rounded-full flex justify-center items-center`}
        >
          <PlusIcon />
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 text-slate-400 font-semibold mt-5 *:cursor-pointer">
        <div
          className={`w-9 h-9 rounded-full border-2 flex justify-center items-center border-slate-400 ${selectedSize === 'small' && 'bg-white border-white text-yellow-800'}`}
          onClick={() => setSelectedSize(SIZE.SMALL)}
        >
          <span>S</span>
        </div>

        <div
          className={`w-9 h-9 rounded-full border-2 flex justify-center items-center border-slate-400 ${selectedSize === 'medium' && 'bg-white border-white text-yellow-800'}`}
          onClick={() => setSelectedSize(SIZE.MEDIUM)}
        >
          <span>M</span>
        </div>
      </div>
    </div>
  );
}
