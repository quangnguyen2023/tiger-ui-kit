import AnalogClock from '../AnalogClock';
import { format, getTimezoneOffset, toZonedTime } from 'date-fns-tz';

interface LocationClockProps {
  isLightMode?: boolean;
  location?: string;
  detailedLocation?: boolean;
  timezone?: string;
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
  isLightMode = true,
  location = 'London',
  detailedLocation,
  timezone,
}: LocationClockProps) {
  // Short code for location (e.g. LON, TOK)
  const locationShort = location.slice(0, 3).toUpperCase();
  const now = new Date();
  const todayString = getTodayString(now, timezone);
  const offsetDiffString = getOffsetDiffString(now, timezone);

  // Render the analog clock with the correct timezone
  const Clock = isLightMode ? (
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
    <div className="flex w-fit flex-col items-center justify-center gap-4">
      {Clock}
      {detailedLocation && (
        <div className="flex flex-col items-center gap-1">
          <div className="text-sm font-semibold text-white">{location}</div>
          {/* Display the current date in the selected timezone */}
          <div className="text-xs font-semibold text-[#99999b]">{todayString}</div>
          {/* Display the timezone offset difference compared to the user's local timezone */}
          <div className="text-xs font-semibold text-[#99999b]">{offsetDiffString}</div>
        </div>
      )}
    </div>
  );
}
