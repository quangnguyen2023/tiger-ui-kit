import { useEffect, useState } from 'react';

type DigitalWatchProps = {
  classes?: string;
};

export default function DigitalWatch({ classes }: DigitalWatchProps) {
  const [time, setTime] = useState<Record<string, any>>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  const calculateTime = () => {
    const currentTime = new Date();

    setTime((prev) => ({
      hours: formatTime(currentTime.getHours()),
      minutes: formatTime(currentTime.getMinutes()),
      seconds: formatTime(currentTime.getSeconds()),
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
      ${classes} flex items-stretch gap-2 rounded-lg w-fit text-center relative
    before:bg-white before:absolute before:top-1/2 before:-translate-y-1/2 before:h-1 before:w-full
      before:z-50
    `}
    >
      <div className="bg-amber-100 rounded-lg flex-1 px-5 relative">
        <span className="text-[10rem]"> {time?.hours} </span>
        <span className="absolute bottom-2 left-3"> AM </span>
      </div>

      <div className="bg-amber-100 rounded-lg flex-1 px-5">
        <span className="text-[10rem]"> {time?.minutes} </span>
      </div>

      <div className="bg-amber-100 rounded-lg flex-1 px-5">
        <span className="text-[10rem]"> {time?.seconds} </span>
      </div>
    </div>
  );
}
