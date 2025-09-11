import { InnerConfig } from './types';

interface ClockCenterDotProps {
  config: InnerConfig;
}

export const ClockCenterDot = ({ config }: ClockCenterDotProps) => {
  return (
    <>
      <div
        className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundColor: config.textColor,
          width: `${config.hourHandSize.width * 3.5}px`,
          height: `${config.hourHandSize.width * 3.5}px`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400"
        style={{
          width: `${config.minuteHandSize.width * 2.3}px`,
          height: `${config.minuteHandSize.width * 2.3}px`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 z-50 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundColor: config.backgroundColor,
          width: `${config.secondHandSize.width * 2}px`,
          height: `${config.secondHandSize.width * 2}px`,
        }}
      />
    </>
  );
};
