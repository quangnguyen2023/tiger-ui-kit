import { addLeadingZero } from '@/lib/utils';
import AnalogClock from '../AnalogClock';
import { format, getTimezoneOffset, toZonedTime } from 'date-fns-tz';

interface LocationClockProps {
  // Xóa prop isLightMode
  // isLightMode?: boolean;
  location?: string;
  detailedLocation?: boolean;
  timezone: string;
}

// Helper: Get formatted date string in the given timezone
function getTodayString(date: Date, timezone?: string) {
  const zonedDate = timezone ? toZonedTime(date, timezone) : date;
  return format(zonedDate, 'dd/MM/yyyy', { timeZone: timezone });
}

// Helper: Calculate timezone offset difference (in hours) between target and local
function getOffsetDiffString(date: Date, timezone?: string) {
  // getTimezoneOffset returns offset in minutes from UTC (positive for UTC-, negative for UTC+)
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
}

export default function LocationClock({
  // Xóa isLightMode
  // isLightMode = true,
  location = 'London',
  detailedLocation,
  timezone,
}: LocationClockProps) {
  // Short code for location (e.g. LON, TOK)
  const locationShort = location.slice(0, 3).toUpperCase();
  const now = new Date();
  const todayString = getTodayString(now, timezone);
  const offsetDiffString = getOffsetDiffString(now, timezone);

  const time = toZonedTime(now, timezone);

  // Tự động xác định ban ngày/ban đêm dựa vào giờ ở timezone
  const hour = time.getHours();
  const isDayTime = hour >= 6 && hour < 18;

  // Render the analog clock với chế độ sáng/tối tự động
  const Clock = isDayTime ? (
    <AnalogClock title={!detailedLocation ? locationShort : ''} timezone={timezone} />
  ) : (
    <AnalogClock
      textColor="white"
      backgroundColor="#343436"
      title={!detailedLocation ? locationShort : ''}
      timezone={timezone}
    />
  );

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {Clock}
      {detailedLocation && (
        <div className="flex flex-col items-center gap-1.5">
          <div className="text-xl font-medium text-white text-shadow-lg">{location}</div>
          <div className="text-2xl font-semibold text-white text-shadow-lg">
            {`${addLeadingZero(time.getHours())}:${addLeadingZero(time.getMinutes())}`}
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
