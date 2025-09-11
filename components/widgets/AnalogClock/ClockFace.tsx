import { calculateNumberPositions } from '@/components/widgets/AnalogClock/utils';
import { InnerConfig } from './types';

interface ClockFaceProps {
  config: InnerConfig;
}

interface NumberPosition {
  text: number;
  top: number;
  left: number;
}

export const ClockFace = ({ config }: ClockFaceProps) => {
  const { enableIndicators, diameter, offsetWithoutIndicators, textColor } =
    config;

  const radius = enableIndicators
    ? diameter / 2.6
    : (diameter + offsetWithoutIndicators) / 2.5;
  const centerX = diameter / 2;
  const centerY = diameter / 2;

  const numbers: NumberPosition[] = calculateNumberPositions(
    centerX,
    centerY,
    radius,
  ).map((position: { top: number; left: number }, index: number) => ({
    text: index + 1,
    top: position.top,
    left: position.left,
  }));

  return (
    <>
      {numbers.map((number: NumberPosition) => (
        <div
          key={number.text}
          className="absolute ml-[1px] -translate-x-1/2 -translate-y-1/2"
          style={{
            top: number.top,
            left: number.left,
            color: textColor,
          }}
        >
          {number.text}
        </div>
      ))}

      {enableIndicators && (
        <div>
          {Array(60)
            .fill(0)
            .map((_, index) => {
              const isFifth = (index + 0) % 5 === 0;
              return (
                <div
                  key={index}
                  className="absolute left-1/2 rounded-full bg-slate-400"
                  style={{
                    width: config.indicatorSize.width,
                    height: config.indicatorSize.height,
                    backgroundColor: isFifth ? textColor : '',
                    transform: `rotate(${index * 6}deg)`,
                    transformOrigin: `50% ${diameter / 2}px`,
                  }}
                />
              );
            })}
        </div>
      )}
    </>
  );
};
