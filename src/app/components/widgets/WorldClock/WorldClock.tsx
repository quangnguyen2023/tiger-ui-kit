import { SIZE } from './constants';
import LocationClock from './LocationClock';
import { PlusIcon } from '@heroicons/react/24/outline';

type WorldClockProps = {
  selectedSize: SIZE;
};

export default function WorldClock({ selectedSize = SIZE.MEDIUM }: WorldClockProps) {
  return (
    <div
      className={`
        relative p-6 grid ${selectedSize === SIZE.MEDIUM ? 'grid-cols-4 gap-8' : 'grid-cols-2 gap-5'} 
        bg-[#1c1c1e] rounded-xl shadow-lg
      `}
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
  );
}
