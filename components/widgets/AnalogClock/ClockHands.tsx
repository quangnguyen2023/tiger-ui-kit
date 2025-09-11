import { useEffect, useState } from 'react';
import { InnerConfig } from './types';

interface ClockHandsProps {
  config: InnerConfig;
}

export const ClockHands = ({ config }: ClockHandsProps) => {
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
    }, config.updateDuration);

    return () => {
      clearInterval(interval);
    };
  }, [config]);

  return (
    <>
      {/* hour hand */}
      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
        <div
          className="relative origin-bottom"
          style={{
            backgroundColor: config.textColor,
            transform: `rotate(${handsDeg.hourHandDeg}deg)`,
            height: `${config.hourHandSize.height}px`,
            width: `${config.hourHandSize.width}px`,
          }}
        >
          <span
            className="absolute -top-0.5 left-1/2 -translate-x-1/2 rounded-full bg-inherit"
            style={{
              height: `${config.hourHandSize.height * 0.82}px`,
              width: `${config.hourHandSize.width * 1.8}px`,
            }}
          />
        </div>
      </div>

      {/* minute hand */}
      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
        <div
          className="relative origin-bottom"
          style={{
            backgroundColor: config.textColor,
            transform: `rotate(${handsDeg.minuteHandDeg}deg)`,
            height: `${config.minuteHandSize.height}px`,
            width: `${config.minuteHandSize.width}px`,
          }}
        >
          <span
            className="absolute -top-0.5 left-1/2 -translate-x-1/2 rounded-full bg-inherit"
            style={{
              height: `${config.minuteHandSize.height * 0.87}px`,
              width: `${config.minuteHandSize.width * 1.8}px`,
            }}
          />
        </div>
      </div>

      {/* second hand */}
      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
        <div
          className="absolute bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 rounded-full bg-orange-500"
          style={{
            transform: `rotate(${handsDeg.secondHandDeg}deg)`,
            height: `${config.secondHandSize.height}px`,
            width: `${config.secondHandSize.width}px`,
          }}
        />
      </div>

      {/* second hand inverse */}
      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
        <div
          className="absolute bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 rounded-full bg-orange-500"
          style={{
            transform: `rotate(${handsDeg.secondHandDeg + 180}deg)`,
            height: `${config.secondHandSize.height * 0.25}px`,
            width: `${config.secondHandSize.width}px`,
          }}
        />
      </div>
    </>
  );
};
