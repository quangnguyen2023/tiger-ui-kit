'use client';

import { useMemo } from 'react';
import { ClockCenterDot } from '@/components/widgets/AnalogClock/ClockCenterDot';
import { ClockFace } from '@/components/widgets/AnalogClock/ClockFace';
import { ClockHands } from '@/components/widgets/AnalogClock/ClockHands';
import {
  AnalogClockProps,
  InnerConfig,
} from '@/components/widgets/AnalogClock/types';

const baseConfig: InnerConfig = {
  diameter: 200,
  updateDuration: 50,
  enableIndicators: false,
  indicatorSize: { width: 1, height: 8 },
  backgroundColor: 'white',
  offsetWithoutIndicators: 25,
  hourHandSize: { width: 4, height: 64 },
  minuteHandSize: { width: 4, height: 96 },
  secondHandSize: { width: 2, height: 96 },
  fontSizeClass: 'text-2xl',
  titleSizeClass: 'text-xl',
  title: '',
  textColor: 'black',
};

export default function AnalogClock(props: AnalogClockProps) {
  const innerConfig: InnerConfig = useMemo(
    () => ({
      ...baseConfig,
      ...props,
    }),
    [props],
  );

  return (
    <div
      className={`w-fit rounded-full border-2 border-gray-100 p-1.5 shadow-xl`}
      style={{ backgroundColor: innerConfig.backgroundColor }}
    >
      <div
        className={`relative rounded-full ${innerConfig.fontSizeClass} -ml-[1px] font-bold`}
        style={{
          width: innerConfig.diameter,
          height: innerConfig.diameter,
        }}
      >
        <div
          className={`absolute ${innerConfig.titleSizeClass} top-[20%] left-1/2 -translate-x-1/2 text-slate-400`}
        >
          {innerConfig.title}
        </div>

        <ClockCenterDot config={innerConfig} />
        <ClockHands config={innerConfig} />
        <ClockFace config={innerConfig} />
      </div>
    </div>
  );
}
