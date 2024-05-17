import { useEffect, useMemo, useState } from 'react';

const SIZE = {
  small: {
    diameter: 200,
    updateDuration: 50,
    enableIndicators: false,
    backgroundColor: 'white',
    offsetRatioX: 0.2,
    offsetRatioY: 0.17,
    offsetWithoutIndicators: 30,
    hourHandLength: 64, // h-18
    minuteHandLength: 96, // h-24
    secondHandLength: 96, // h-24
    title: '',
  },
  medium: {
    diameter: 300,
    updateDuration: 50,
    enableIndicators: true,
    backgroundColor: 'white',
    offsetRatioX: 0.145,
    offsetRatioY: 0.145,
    offsetWithoutIndicators: 50,
    hourHandLength: 96, // h-24
    minuteHandLength: 144, // h-36
    secondHandLength: 144, // h-36
    title: '',
  },
  large: {
    diameter: 400,
    updateDuration: 50,
    enableIndicators: true,
    backgroundColor: 'white',
    offsetRatioX: 0.05,
    offsetRatioY: 0.05,
    offsetWithoutIndicators: 70,
    hourHandLength: 96,
    minuteHandLength: 144,
    secondHandLength: 144,
    title: '',
  },
};

type AnalogClockProps = {
  updateDuration?: number; // Cập nhật thời gian render kim giây
  enableIndicators?: boolean;
  backgroundColor?: string;
  size?: keyof typeof SIZE; //'small' | 'medium' | 'large'
  title?: string;
};

interface InnerConfig extends AnalogClockProps {
  diameter: number;
  offsetRatioX: number;
  offsetRatioY: number;
  offsetWithoutIndicators: number;
  hourHandLength: number;
  minuteHandLength: number;
  secondHandLength: number;
}

export default function AnalogClock(props: AnalogClockProps) {
  const { size = 'medium' } = props;

  const innerConfig: InnerConfig = useMemo(
    () => ({
      ...SIZE[size],
      ...props,
    }),
    [props]
  );

  const [handsDeg, setHandsDeg] = useState({ hourHandDeg: 0, minuteHandDeg: 0, secondHandDeg: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();

      // Tính toán vị trí kim giờ:
      // (time.getHours() / 24) * 720:   1 vòng quay 360 độ => 2 vòng 720 độ = 24 giờ
      // Tính độ chênh lệch cho kim giờ theo phút:
      // (time.getMinutes() / 60) * 30:  360 độ = 12 giờ => (1 giờ =) 60 phút = 30 độ
      const hourHandDeg = (time.getHours() / 24) * 720 + (time.getMinutes() / 60) * 30;
      const minuteHandDeg = (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6;
      const secondHandDeg = (time.getSeconds() / 60 + time.getMilliseconds() / 60000) * 360;

      setHandsDeg({ hourHandDeg, minuteHandDeg, secondHandDeg });
    }, innerConfig.updateDuration);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function calculatePositions(centerX: number, centerY: number, radius: number) {
    const positions = [];
    const angleStep = Math.PI / 6; // 30 degrees between each number

    for (let i = 0; i < 12; i++) {
      const angle = (i - 2) * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const offsetX = radius * innerConfig.offsetRatioX;
      const offsetY = radius * innerConfig.offsetRatioY;

      positions.push({
        top: Math.floor(y - offsetY) + 'px',
        left: Math.floor(x - offsetX) + 'px',
      });
    }

    return positions;
  }

  const renderNumbers = () => {
    const { enableIndicators, diameter, offsetWithoutIndicators } = innerConfig;

    const radius = enableIndicators ? diameter / 2.5 : (diameter + offsetWithoutIndicators) / 2.5;
    const centerX = diameter / 2;
    const centerY = diameter / 2;

    const numbers = calculatePositions(centerX, centerY, radius).map((position, index) => ({
      text: index + 1,
      top: `${position.top}`,
      left: `${position.left}`,
    }));

    return (
      <>
        {numbers.map((number) => (
          <div
            key={number.text}
            className="absolute w-10 flex justify-center"
            style={{ top: number.top, left: number.left }}
          >
            {number.text}
          </div>
        ))}
      </>
    );
  };

  const renderIndicators = () => {
    return (
      <>
        {Array(60)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="
                absolute w-0.5 h-3 left-1/2 bg-slate-400 -ml-[1px] origin-[50%_150px] 
                [&:nth-of-type(5n)]:w-1 [&:nth-of-type(5n)]:bg-black rounded-full
              "
              style={{ transform: `rotate(${(index + 5) * 6}deg)` }}
            />
          ))}
      </>
    );
  };

  return (
    <div
      className=" p-2 rounded-full border-4 float-left"
      style={{ backgroundColor: innerConfig.backgroundColor }}
    >
      <div
        className={`rounded-full relative ${innerConfig.size === 'small' ? 'text-2xl' : 'text-3xl'}  font-bold`}
        style={{
          width: innerConfig.diameter,
          height: innerConfig.diameter,
          backgroundColor: innerConfig.backgroundColor,
        }}
      >
        {/* dot */}
        <div className="absolute w-3.5 h-3.5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black z-30" />
        <div className="absolute w-2 h-2 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-400 z-40" />
        <div className="absolute w-1 h-1 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50" />

        {/* hour hand */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="w-1 bg-black origin-bottom relative"
            style={{
              transform: `rotate(${handsDeg.hourHandDeg}deg)`,
              height: `${innerConfig.hourHandLength}px`,
            }}
          >
            <span
              className="absolute w-2 -left-1/2 rounded-full bg-inherit"
              style={{ height: `${innerConfig.hourHandLength - 16}px` }}
            />
          </div>
        </div>

        {/* minute hand */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="w-1 bg-black origin-bottom relative"
            style={{
              transform: `rotate(${handsDeg.minuteHandDeg}deg)`,
              height: `${innerConfig.minuteHandLength}px`,
            }}
          >
            <span
              className="absolute w-2 -left-1/2 rounded-full bg-inherit"
              style={{ height: `${innerConfig.minuteHandLength - 16}px` }}
            />
          </div>
        </div>

        {/* second hand */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="w-0.5 bg-orange-500 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom"
            style={{
              transform: `rotate(${handsDeg.secondHandDeg}deg)`,
              height: `${innerConfig.secondHandLength}px`,
            }}
          ></div>
        </div>

        {/* second hand inverse */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="
              w-0.5 h-6 bg-orange-500 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom 
            "
            style={{ transform: `rotate(${handsDeg.secondHandDeg + 180}deg)` }}
          ></div>
        </div>

        {renderNumbers()}
        {innerConfig.enableIndicators && renderIndicators()}
      </div>
    </div>
  );
}
