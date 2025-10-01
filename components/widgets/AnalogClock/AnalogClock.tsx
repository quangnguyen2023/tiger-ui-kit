'use client';

import { useMemo } from 'react';
import { ClockCenterDot } from '@/components/widgets/AnalogClock/ClockCenterDot';
import { ClockFace } from '@/components/widgets/AnalogClock/ClockFace';
import { ClockHands } from '@/components/widgets/AnalogClock/ClockHands';
import { AnalogClockProps, InnerConfig } from '@/components/widgets/AnalogClock/types';
import { getWidgetSize } from '@/configs/widgetSizes';
import { WidgetType } from '@/types/widget';

const baseConfig: InnerConfig = {
  diameter: 210,
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
  const size = getWidgetSize(WidgetType.ANALOG_CLOCK);

  const innerConfig: InnerConfig = useMemo(
    () => ({
      ...baseConfig,
      ...props,
      diameter: size.width - 15, // diameter size < container size to fit well
    }),
    [props, size.width],
  );

  return (
    <div
      className={`rounded-full border-2 border-transparent p-1.5 shadow-xl select-none ${props?.classNames || ''}`}
      style={{
        backgroundColor: innerConfig.backgroundColor,
        width: size.width,
        height: size.height,
      }}
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
        <ClockHands config={innerConfig} timezone={props.timezone} />
        <ClockFace config={innerConfig} />
      </div>
    </div>
  );
}
