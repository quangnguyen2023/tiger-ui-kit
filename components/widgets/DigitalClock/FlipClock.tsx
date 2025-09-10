'use client';

import { useEffect, useState } from 'react';
import { FlipUnit } from './FlipUnit';
import { format } from 'date-fns';
import { getWidgetSize } from '@/configs/widgetSizes';
import { WidgetType } from '@/types/widget';

interface FlipClockProps {
  textColor?: string;
  backgroundColor?: string;
  showSeconds?: boolean;
  use24Hours?: boolean;
  scale?: number;
}

const FlipClock = ({
  textColor = '#1F2937',
  backgroundColor = '#FFFFFF',
  showSeconds = true,
  use24Hours = false,
  scale = 1,
}: FlipClockProps) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [weekday, setWeekday] = useState('');
  const [period, setPeriod] = useState('AM');

  const [hoursShuffle, setHoursShuffle] = useState(true);
  const [minutesShuffle, setMinutesShuffle] = useState(true);
  const [secondsShuffle, setSecondsShuffle] = useState(true);

  const size = getWidgetSize(
    WidgetType.DIGITAL_CLOCK,
    showSeconds ? 'default' : 'compact',
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const time = new Date();
      const actualHours = time.getHours();
      let displayHours = actualHours;
      const newMinutes = time.getMinutes();
      const newSeconds = time.getSeconds();
      const newPeriod = actualHours >= 12 ? 'PM' : 'AM';

      // Convert to 12-hour format if needed
      if (!use24Hours) {
        if (actualHours > 12) {
          displayHours = actualHours - 12;
        } else if (actualHours === 0) {
          displayHours = 12;
        } else {
          displayHours = actualHours;
        }
      }
      const newWeekday = format(time, 'EEEE').toUpperCase();

      if (displayHours !== hours) {
        setHours(displayHours);
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
      if (newPeriod !== period) {
        setPeriod(newPeriod);
      }
      if (newWeekday !== weekday) {
        setWeekday(newWeekday);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, minutes, seconds, weekday, period, use24Hours]);

  return (
    <div
      className="flex items-center justify-center gap-[2%]"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      <FlipUnit
        unit="hours"
        digit={hours}
        shuffle={hoursShuffle}
        textColor={textColor}
        backgroundColor={backgroundColor}
        use24Hours={use24Hours}
        period={period}
      />
      <FlipUnit
        unit="minutes"
        digit={minutes}
        shuffle={minutesShuffle}
        weekday={weekday}
        textColor={textColor}
        backgroundColor={backgroundColor}
      />
      {showSeconds && (
        <FlipUnit
          unit="seconds"
          digit={seconds}
          shuffle={secondsShuffle}
          textColor={textColor}
          backgroundColor={backgroundColor}
        />
      )}
    </div>
  );
};

export default FlipClock;
