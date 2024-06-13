import { getDaysInMonth, isSameDay, isSaturday, isSunday } from 'date-fns';
import { DayOfMonthType, MonthRange, firstDayOfWeekType } from './Calendar';
import { LunarDate } from 'vietnamese-lunar-calendar';

export const generateDaysOfMonth = (
  day: number | undefined,
  month: MonthRange,
  year: number,
  firstDayOfWeek: firstDayOfWeekType
) => {
  let days: DayOfMonthType[] = [];
  const totalDaysOfMonth = getDaysInMonth(new Date(year, month));
  const currentDate = new Date();

  // Get the first day of the current month and determine the weekday of that day.
  const firstWeekDayOfMonth = new Date(year, month, 1).getDay();
  const lastWeekDayOfMonth = new Date(year, month, totalDaysOfMonth).getDay();

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
  let lastDayOfPreviousMonth = new Date(year, month, 0).getDate(); // 30 | 31 | 28 | 29

  for (let i = previousMonthPadding - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, lastDayOfPreviousMonth - i);

    days.push({
      value: lastDayOfPreviousMonth - i,
      lunarValue: new LunarDate(date),
      isNotCurrentMonthDay: true,
    });
  }

  // Add days of the month
  for (let i = 1; i <= totalDaysOfMonth; i++) {
    const date = new Date(year, month, i);

    days.push({
      value: i,
      lunarValue: new LunarDate(date),
      isCurrentDay: isSameDay(new Date(year, month, i), currentDate),
      isWeekendDay: isSaturday(date) || isSunday(date),
      isSelectedDay: i === day,
    });
  }

  // Add days of the next month to fill the remaining empty spaces
  for (let i = 1; i <= nextMonthPadding; i++) {
    const date = new Date(year, month + 1, i);
    days.push({
      value: i,
      lunarValue: new LunarDate(date),
      isNotCurrentMonthDay: true,
    });
  }

  return days;
};
