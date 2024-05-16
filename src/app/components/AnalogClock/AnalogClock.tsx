import { useEffect, useMemo, useState } from 'react';

type AnalogClockProps = {
  diameter: number;
  updateDuration?: number; // Tính toán vị trí kim giây (miliseconds)
  enableIndicators?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  title?: string;
};

export default function AnalogClock(props: AnalogClockProps) {
  const [handsDeg, setHandsDeg] = useState({ hourHandDeg: 0, minuteHandDeg: 0, secondHandDeg: 0 });

  const diameter = useMemo(() => props.diameter || 300, [props.diameter]);
  const updateDuration = useMemo(() => props.updateDuration || 50, [props.updateDuration]);
  const enableIndicators = useMemo(() => props.enableIndicators || false, [props.enableIndicators]);
  const backgroundColor = useMemo(() => props.backgroundColor || 'white', [props.backgroundColor]);
  const title = useMemo(() => props.title || '', [props.title]);

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
    }, updateDuration);

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

      const offsetX = radius * 0.15;
      const offsetY = radius * 0.15;

      positions.push({
        top: Math.floor(y - offsetY) + 'px',
        left: Math.floor(x - offsetX) + 'px',
      });
    }

    return positions;
  }

  const renderNumbers = () => {
    const radius = enableIndicators ? diameter / 2.5 : (diameter + 50) / 2.5;
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
    <div className=" p-2 rounded-full border-4 float-left" style={{ backgroundColor }}>
      <div
        className="rounded-full relative text-3xl font-bold"
        style={{ width: diameter, height: diameter, backgroundColor }}
      >
        {/* dot */}
        <div className="absolute w-3.5 h-3.5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black z-30" />
        <div className="absolute w-2 h-2 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-400 z-40" />
        <div className="absolute w-1 h-1 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50" />

        {/* hour hand */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="w-1 h-24 bg-black origin-bottom relative"
            style={{ transform: `rotate(${handsDeg.hourHandDeg}deg)` }}
          >
            <span className="absolute w-2 h-20 -left-1/2 rounded-full bg-inherit" />
          </div>
        </div>

        {/* minute hand */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="w-1 h-36 bg-black origin-bottom relative"
            style={{ transform: `rotate(${handsDeg.minuteHandDeg}deg)` }}
          >
            <span className="absolute w-2 h-32 -left-1/2 rounded-full bg-inherit" />
          </div>
        </div>

        {/* second hand */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="
              w-0.5 h-32 bg-orange-500 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom 
              
            "
            style={{ transform: `rotate(${handsDeg.secondHandDeg}deg)` }}
          ></div>
        </div>

        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
          <div
            className="
              w-0.5 h-6 bg-orange-500 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom 
            "
            style={{ transform: `rotate(${handsDeg.secondHandDeg + 180}deg)` }}
          ></div>
        </div>

        {renderNumbers()}
        {enableIndicators && renderIndicators()}
      </div>
    </div>
  );
}
