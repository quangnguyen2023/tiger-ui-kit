'use client';

import { useEffect, useMemo, useState } from 'react';

const SIZE = {
  small: {
    diameter: 100,
    updateDuration: 50,
    enableIndicators: false,
    indicatorSize: { width: 1.2, height: 4 },
    backgroundColor: 'white',
    offsetWithoutIndicators: 10,
    hourHandSize: { width: 2, height: 28 },
    minuteHandSize: { width: 2, height: 45 },
    secondHandSize: { width: 1, height: 45 },
    fontSizeClass: 'text-xs',
    titleSizeClass: 'text-xs',
    title: '',
  },
  medium: {
    diameter: 200,
    updateDuration: 50,
    enableIndicators: true,
    indicatorSize: { width: 2, height: 8 },
    backgroundColor: 'white',
    offsetWithoutIndicators: 25,
    hourHandSize: { width: 4, height: 64 },
    minuteHandSize: { width: 4, height: 96 },
    secondHandSize: { width: 2, height: 96 },
    fontSizeClass: 'text-2xl',
    titleSizeClass: 'text-xl',
    title: '',
  },
  large: {
    diameter: 300,
    updateDuration: 50,
    enableIndicators: true,
    indicatorSize: { width: 3, height: 12 },
    backgroundColor: 'white',
    offsetWithoutIndicators: 40,
    hourHandSize: { width: 5, height: 96 },
    minuteHandSize: { width: 5, height: 150 },
    secondHandSize: { width: 3, height: 150 },
    fontSizeClass: 'text-3xl',
    titleSizeClass: 'text-2xl',
    title: '',
  },
};

type AnalogClockProps = {
  updateDuration?: number; // Cập nhật thời gian render kim giây
  enableIndicators?: boolean;
  backgroundColor?: string;
  textColor?: string;
  size?: keyof typeof SIZE; //'small' | 'medium' | 'large'
  title?: string;
};

interface InnerConfig extends AnalogClockProps {
  diameter: number;
  offsetWithoutIndicators: number;
  indicatorSize: { width: number; height: number };
  hourHandSize: { width: number; height: number };
  minuteHandSize: { width: number; height: number };
  secondHandSize: { width: number; height: number };
  fontSizeClass: string;
  titleSizeClass: string;
}

export default function AnalogClock(props: AnalogClockProps) {
  const { size = 'medium', textColor = 'black' } = props;

  const innerConfig: InnerConfig = useMemo(
    () => ({
      ...SIZE[size],
      ...props,
      textColor,
    }),
    [props, size, textColor]
  );

  const [handsDeg, setHandsDeg] = useState({
    hourHandDeg: 0,
    minuteHandDeg: 0,
    secondHandDeg: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();

      // Tính toán vị trí kim giờ:
      // (time.getHours() / 24) * 720:   1 vòng quay 360 độ => 2 vòng 720 độ = 24 giờ
      // Tính độ chênh lệch cho kim giờ theo phút:
      // (time.getMinutes() / 60) * 30:  360 độ = 12 giờ => (1 giờ =) 60 phút = 30 độ
      const hourHandDeg =
        (time.getHours() / 24) * 720 + (time.getMinutes() / 60) * 30;
      const minuteHandDeg =
        (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6;
      const secondHandDeg =
        (time.getSeconds() / 60 + time.getMilliseconds() / 60000) * 360;

      setHandsDeg({ hourHandDeg, minuteHandDeg, secondHandDeg });
    }, innerConfig.updateDuration);

    return () => {
      clearInterval(interval);
    };
  }, [innerConfig]);

  function calculatePositions(
    centerX: number,
    centerY: number,
    radius: number
  ) {
    const positions = [];
    const angleStep = Math.PI / 6; // 30 degrees between each number

    for (let i = 0; i < 12; i++) {
      const angle = (i - 2) * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      positions.push({
        top: Math.floor(y) + 'px',
        left: Math.floor(x) + 'px',
      });
    }

    return positions;
  }

  const renderNumbers = () => {
    const { enableIndicators, diameter, offsetWithoutIndicators } = innerConfig;

    const radius = enableIndicators
      ? diameter / 2.6
      : (diameter + offsetWithoutIndicators) / 2.5;
    const centerX = diameter / 2;
    const centerY = diameter / 2;

    const numbers = calculatePositions(centerX, centerY, radius).map(
      (position, index) => ({
        text: index + 1,
        top: `${position.top}`,
        left: `${position.left}`,
      })
    );

    return (
      <>
        {numbers.map((number) => (
          <div
            key={number.text}
            className="absolute ml-[1px] -translate-x-1/2 -translate-y-1/2"
            style={{
              top: number.top,
              left: number.left,
              color: innerConfig.textColor,
            }}
          >
            {number.text}
          </div>
        ))}
      </>
    );
  };

  const renderIndicators = () => {
    return (
      <div>
        {Array(60)
          .fill(0)
          .map((_, index) => {
            const isFifth = (index + 0) % 5 === 0;
            return (
              <div
                key={index}
                className="absolute left-1/2 bg-slate-400 rounded-full"
                style={{
                  width: innerConfig.indicatorSize.width,
                  height: innerConfig.indicatorSize.height,
                  backgroundColor: isFifth ? innerConfig.textColor : '',
                  transform: `rotate(${index * 6}deg)`,
                  transformOrigin: `50% ${innerConfig.diameter / 2}px`,
                }}
              />
            );
          })}
      </div>
    );
  };

  return (
    <div
      className={`${
        innerConfig.size === 'small' ? 'p-0.5' : 'p-1.5'
      } rounded-full shadow-xl w-fit`}
      style={{ backgroundColor: innerConfig.backgroundColor }}
    >
      <div
        className={`rounded-full relative ${innerConfig.fontSizeClass} -ml-[1px] font-bold`}
        style={{
          width: innerConfig.diameter,
          height: innerConfig.diameter,
        }}
      >
        {/* title */}
        <div
          className={`absolute ${innerConfig.titleSizeClass} left-1/2 top-[20%] -translate-x-1/2 text-slate-400`}
        >
          {innerConfig.title}
        </div>

        {/* dot */}
        <div
          className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          style={{
            backgroundColor: innerConfig.textColor,
            width: `${innerConfig.hourHandSize.width * 3.5}px`,
            height: `${innerConfig.hourHandSize.width * 3.5}px`,
          }}
        />
        <div
          className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-400 z-40"
          style={{
            width: `${innerConfig.minuteHandSize.width * 2.3}px`,
            height: `${innerConfig.minuteHandSize.width * 2.3}px`,
          }}
        />
        <div
          className="absolute w-1 h-1 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          style={{
            backgroundColor: innerConfig.backgroundColor,
            width: `${innerConfig.secondHandSize.width * 2}px`,
            height: `${innerConfig.secondHandSize.width * 2}px`,
          }}
        />

        {/* hour hand */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="origin-bottom relative"
            style={{
              backgroundColor: innerConfig.textColor,
              transform: `rotate(${handsDeg.hourHandDeg}deg)`,
              height: `${innerConfig.hourHandSize.height}px`,
              width: `${innerConfig.hourHandSize.width}px`,
            }}
          >
            <span
              className="absolute -top-0.5 left-1/2 -translate-x-1/2 rounded-full bg-inherit"
              style={{
                height: `${innerConfig.hourHandSize.height * 0.82}px`,
                width: `${innerConfig.hourHandSize.width * 1.8}px`,
              }}
            />
          </div>
        </div>

        {/* minute hand */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="origin-bottom relative"
            style={{
              backgroundColor: innerConfig.textColor,
              transform: `rotate(${handsDeg.minuteHandDeg}deg)`,
              height: `${innerConfig.minuteHandSize.height}px`,
              width: `${innerConfig.minuteHandSize.width}px`,
            }}
          >
            <span
              className="absolute -top-0.5 left-1/2 -translate-x-1/2 rounded-full bg-inherit"
              style={{
                height: `${innerConfig.minuteHandSize.height * 0.87}px`,
                width: `${innerConfig.minuteHandSize.width * 1.8}px`,
              }}
            />
          </div>
        </div>

        {/* second hand */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="bg-orange-500 absolute rounded-full bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom"
            style={{
              transform: `rotate(${handsDeg.secondHandDeg}deg)`,
              height: `${innerConfig.secondHandSize.height}px`,
              width: `${innerConfig.secondHandSize.width}px`,
            }}
          ></div>
        </div>

        {/* second hand inverse */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="bg-orange-500 absolute rounded-full bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom"
            style={{
              transform: `rotate(${handsDeg.secondHandDeg + 180}deg)`,
              height: `${innerConfig.secondHandSize.height * 0.25}px`,
              width: `${innerConfig.secondHandSize.width}px`,
            }}
          ></div>
        </div>

        {renderNumbers()}
        {innerConfig.enableIndicators && renderIndicators()}
      </div>
    </div>
  );
}
