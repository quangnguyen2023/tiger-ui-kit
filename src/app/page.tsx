'use client';

import AnalogClock from './components/AnalogClock';
import DigitalClock from './components/DigitalClock';

export default function Home() {
  return (
    <div className="flex justify-center w-full mt-5">
      <DigitalClock />
    </div>
  );
}
