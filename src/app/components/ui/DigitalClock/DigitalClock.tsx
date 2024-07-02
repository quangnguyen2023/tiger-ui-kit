import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

type DigitalWatchProps = {
  colorClass?: string;
  backgroundColorClass?: string;
};

export default function DigitalWatch({
  colorClass = 'text-black-200',
  backgroundColorClass = 'bg-[#FEF3C7]',
}: DigitalWatchProps) {
  const [time, setTime] = useState<Record<string, any>>({
    hours: '00',
    minutes: '00',
    period: 'AM',
    dayOfWeek: 'Monday',
  });

  const calculateTime = () => {
    const currentTime = format(new Date(), 'hh:mm a cccc');

    setTime((prev) => ({
      hours: currentTime.slice(0, 2),
      minutes: currentTime.slice(3, 5),
      period: currentTime.slice(6, 8),
      dayOfWeek: currentTime.slice(8),
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`
        ${poppins.className} flex items-stretch gap-2 rounded-lg w-fit min-w-[32rem] text-center relative
      before:bg-white before:absolute before:top-1/2 before:-translate-y-1/2 before:h-0.5 before:w-full
        before:z-50
      `}
    >
      <div
        className={`grow basis-0 flex justify-center items-center rounded-lg px-5 relative shadow-md ${backgroundColorClass}`}
        data-testid="time-element"
      >
        <span className={`text-[10rem] ${colorClass}`}> {time.hours} </span>
        <span
          className={`absolute bottom-3 left-4 font-semibold tracking-wide uppercase text-xl ${colorClass}`}
        >
          {time.period}
        </span>
      </div>

      <div
        className={`grow basis-0 flex justify-center items-center rounded-lg px-5 relative shadow-md min-h-[18rem] ${backgroundColorClass}`}
        data-testid="time-element"
      >
        <span className={`text-[10rem] ${colorClass}`}> {time.minutes} </span>
        <span
          className={`absolute bottom-3 right-4 font-semibold tracking-wide uppercase text-xl ${colorClass}`}
        >
          {time.dayOfWeek}
        </span>
      </div>
    </div>
  );
}
