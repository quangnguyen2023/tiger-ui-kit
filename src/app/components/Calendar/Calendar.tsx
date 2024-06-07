import { format, getDaysInMonth, isSaturday, isSunday } from 'date-fns';
import DaysOfWeek from './DaysOfWeek';
import DaysOfMonth from './DaysOfMonth';
import { LunarDate } from 'vietnamese-lunar-calendar';
import MonthNavigator from './MonthNavigator';

export type DayOfMonthType = {
  value: number;
  lunarValue?: LunarDate;
  isCurrentDay?: boolean;
  isWeekendDay?: boolean;
  isNotCurrentMonthDay?: boolean;
};

export type firstDayOfWeekType = 'Sunday' | 'Monday';

type CalendarProps = {
  enableLunarCalendar?: boolean;
  firstDayOfWeek?: firstDayOfWeekType;
};

export default function Calendar({
  enableLunarCalendar = true,
  firstDayOfWeek = 'Sunday',
}: CalendarProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const totalDaysOfMonth = getDaysInMonth(currentDate);

  const daysOfMonth: DayOfMonthType[] = (() => {
    let days: DayOfMonthType[] = [];

    // Get the first day of the current month and determine the weekday of that day.
    const firstWeekDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastWeekDayOfMonth = new Date(currentYear, currentMonth, totalDaysOfMonth).getDay();

    // Caculate the number of empty positions based on
    // whether the first day of week is Monday or Sunday.
    let previousMonthPadding = 0;
    let nextMonthPadding = 0;

    if (firstDayOfWeek === 'Monday') {
      previousMonthPadding = firstWeekDayOfMonth === 0 ? 6 : firstWeekDayOfMonth - 1;
      nextMonthPadding = lastWeekDayOfMonth === 0 ? 0 : 7 - lastWeekDayOfMonth;
    } else {
      previousMonthPadding = firstWeekDayOfMonth === 0 ? 0 : firstWeekDayOfMonth;
      nextMonthPadding = 7 - (lastWeekDayOfMonth + 1);
    }

    // Add days of the Previous Month to fill empty spaces
    let lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0).getDate(); // 30 | 31 | 28 | 29

    for (let i = previousMonthPadding - 1; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1, lastDayOfPreviousMonth - i);

      days.push({
        value: lastDayOfPreviousMonth - i,
        lunarValue: new LunarDate(date),
        isNotCurrentMonthDay: true,
      });
    }

    // Add days of the month
    for (let i = 1; i <= totalDaysOfMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);

      days.push({
        value: i,
        lunarValue: new LunarDate(new Date(currentYear, currentMonth, i)),
        isCurrentDay: i === currentDate.getDate(),
        isWeekendDay: isSaturday(date) || isSunday(date),
      });
    }

    // Add days of the next month to fill the remaining empty spaces
    for (let i = 1; i <= nextMonthPadding; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      days.push({
        value: i,
        lunarValue: new LunarDate(date),
        isNotCurrentMonthDay: true,
      });
    }

    return days;
  })();

  return (
    <div className="w-fit bg-[#2e2e2e] rounded-3xl py-5 px-4">
      <MonthNavigator />

      <div
        className={`${enableLunarCalendar ? 'text-base' : 'text-sm'} font-semibold text-white mt-3`}
      >
        <DaysOfWeek firstDayOfWeek={firstDayOfWeek} />
        <DaysOfMonth daysOfMonth={daysOfMonth} enableLunarCalendar={enableLunarCalendar} />
      </div>
    </div>
  );
}
