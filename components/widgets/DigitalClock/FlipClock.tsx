import { useEffect, useState } from 'react';
import { FlipUnit } from './FlipUnit';

export const FlipClock = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [hoursShuffle, setHoursShuffle] = useState(true);
  const [minutesShuffle, setMinutesShuffle] = useState(true);
  const [secondsShuffle, setSecondsShuffle] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const time = new Date();
      const newHours = time.getHours();
      const newMinutes = time.getMinutes();
      const newSeconds = time.getSeconds();

      if (newHours !== hours) {
        setHours(newHours);
        setHoursShuffle((prev) => !prev);
      }
      if (newMinutes !== minutes) {
        setMinutes(newMinutes);
        setMinutesShuffle((prev) => !prev);
      }
      if (newSeconds !== seconds) {
        setSeconds(newSeconds);
        setSecondsShuffle((prev) => !prev);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  return (
    <div className="flex gap-10">
      <FlipUnit unit="hours" digit={hours} shuffle={hoursShuffle} />
      <FlipUnit unit="minutes" digit={minutes} shuffle={minutesShuffle} />
      <FlipUnit unit="seconds" digit={seconds} shuffle={secondsShuffle} />
    </div>
  );
};
