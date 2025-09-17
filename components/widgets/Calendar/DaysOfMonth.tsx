import { cn } from '@/lib/utils';
import { DayOfMonthType } from './types';

type DaysOfMonthProps = {
  daysOfMonth: DayOfMonthType[];
  enableLunarCalendar?: boolean;
};

export default function DaysOfMonth({
  daysOfMonth,
  enableLunarCalendar,
}: DaysOfMonthProps) {
  return (
    <div className="mt-2 grid grid-cols-7 gap-1 gap-y-2">
      {daysOfMonth.map((day, index) =>
        // prettier-ignore
        <div
          key={index}
          className={cn(
            'relative rounded-md border-2 border-dashed border-transparent py-5',
            {
              'bg-[#f64338] text-white': day?.isCurrentDay,
              'text-[#949494] dark:text-[#a8a8a8]': !day?.isCurrentDay && day?.isWeekendDay,
              'text-[#dbdbdb] dark:text-[#5d5d5d]': day?.isNotCurrentMonthDay,
              '!border-[#f64338]': day?.isSelectedDay,
            },
          )}
        >
          <div
            className={`absolute ${enableLunarCalendar ? 'top-[60%]' : 'top-1/2'} left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center`}
          >
            {/* Solar date */}
            <span className="text-base">{day.value}</span>

            {/* Lunar date */}
            {enableLunarCalendar && day.value && (
              <span
                className={cn(`-mt-0.5 ml-4 text-[0.65rem]`, {
                  'text-[#9b9b9b]': !day?.isCurrentDay && day?.isWeekendDay,
                  'text-red-500': day.lunarValue?.date === 1 && !day?.isCurrentDay,
                })}
              >
                {day.lunarValue?.date === 1
                  ? `${day.lunarValue?.date}/${day.lunarValue?.month}`
                  : day.lunarValue?.date}
              </span>
            )}
          </div>
        </div>,
      )}
    </div>
  );
}
