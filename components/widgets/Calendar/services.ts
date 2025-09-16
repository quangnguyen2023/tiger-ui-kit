import { getDaysInMonth, isSameDay, isSaturday, isSunday } from 'date-fns';
import { DayOfMonthType, MonthRange, FirstDayOfWeekType } from './types';
import { LunarDate } from 'vietnamese-lunar-calendar';

export const generateDaysOfMonth = (
  day: number | undefined,
  month: MonthRange,
  year: number,
  firstDayOfWeek: FirstDayOfWeekType,
) => {
  let days: DayOfMonthType[] = [];
  const totalDaysOfMonth = getDaysInMonth(new Date(year, month));
  const currentDate = new Date();

  const firstWeekDayOfMonth = new Date(year, month, 1).getDay();
  const lastWeekDayOfMonth = new Date(year, month, totalDaysOfMonth).getDay();

  let previousMonthPadding = 0;
  let nextMonthPadding = 0;

  if (firstDayOfWeek === 'Monday') {
    previousMonthPadding =
      firstWeekDayOfMonth === 0 ? 6 : firstWeekDayOfMonth - 1;
    nextMonthPadding = lastWeekDayOfMonth === 0 ? 0 : 7 - lastWeekDayOfMonth;
  } else {
    previousMonthPadding = firstWeekDayOfMonth === 0 ? 0 : firstWeekDayOfMonth;
    nextMonthPadding = 7 - (lastWeekDayOfMonth + 1);
  }

  let lastDayOfPreviousMonth = new Date(year, month, 0).getDate();

  for (let i = previousMonthPadding - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, lastDayOfPreviousMonth - i);

    days.push({
      value: lastDayOfPreviousMonth - i,
      lunarValue: new LunarDate(date),
      isNotCurrentMonthDay: true,
    });
  }

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
