import { addLeadingZero } from '@/lib/utils';
import AnalogClock from '../AnalogClock';
import { format, getTimezoneOffset, toZonedTime } from 'date-fns-tz';
import { useEffect, useState, useMemo } from 'react';

interface LocationClockProps {
  // Xóa prop isLightMode
  // isLightMode?: boolean;
  location?: string;
  detailedLocation?: boolean;
  timezone: string;
}

// Helper: Get formatted date string in the given timezone
const getTodayString = (date: Date, timezone?: string) => {
  const zonedDate = timezone ? toZonedTime(date, timezone) : date;
  return format(zonedDate, 'dd/MM/yyyy', { timeZone: timezone });
};

// Helper: Calculate timezone offset difference (in hours) between target and local
const getOffsetDiffString = (date: Date, timezone?: string) => {
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localOffsetMiliSec = getTimezoneOffset(localTimezone, date);

  const targetOffsetMiliSec = timezone
    ? getTimezoneOffset(timezone, date)
    : localOffsetMiliSec;

  const diffHours = -Math.round(
    (localOffsetMiliSec - targetOffsetMiliSec) / (1000 * 60 * 60),
  );

  if (diffHours === 0) return '+0HRS';
  return diffHours > 0 ? `+${diffHours}HRS` : `${diffHours}HRS`;
};

export default function LocationClock({
  location = 'London',
  detailedLocation,
  timezone,
}: LocationClockProps) {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime((prevTime) => {
        if (now.getMinutes() !== prevTime.getMinutes()) {
          return now;
        }
        return prevTime;
      });
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const zonedTime = useMemo(
    () => toZonedTime(currentTime, timezone),
    [currentTime, timezone],
  );

  const todayString = useMemo(
    () => getTodayString(currentTime, timezone),
    [currentTime, timezone],
  );

  const offsetDiffString = useMemo(
    () => getOffsetDiffString(currentTime, timezone),
    [currentTime, timezone],
  );

  const hour = zonedTime.getHours();
  const isDayTime = hour >= 6 && hour < 18;
  const locationShort = location.slice(0, 3).toUpperCase();

  const ClockComponent = useMemo(() => {
    if (isDayTime) {
      return (
        <AnalogClock title={!detailedLocation ? locationShort : ''} timezone={timezone} />
      );
    } else {
      return (
        <AnalogClock
          textColor="white"
          backgroundColor="#343436"
          title={!detailedLocation ? locationShort : ''}
          timezone={timezone}
        />
      );
    }
  }, [isDayTime, detailedLocation, locationShort, timezone]);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {ClockComponent}
      {detailedLocation && (
        <div className="flex flex-col items-center gap-1.5">
          <div className="text-xl font-medium text-white text-shadow-lg">{location}</div>
          <div className="text-2xl font-semibold text-white text-shadow-lg">
            {`${addLeadingZero(zonedTime.getHours())}:${addLeadingZero(zonedTime.getMinutes())}`}
          </div>
          {/* Display the current date in the selected timezone */}
          <div className="text-base font-semibold text-[#9c9c9d]">{todayString}</div>
          {/* Display the timezone offset difference compared to the user's local timezone */}
          <div className="text-base font-semibold text-[#9c9c9d]">{offsetDiffString}</div>
        </div>
      )}
    </div>
  );
}
