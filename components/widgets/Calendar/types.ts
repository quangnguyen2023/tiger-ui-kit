import { LunarDate } from 'vietnamese-lunar-calendar';

export type DayOfMonthType = {
  value: number;
  lunarValue?: LunarDate;
  isCurrentDay?: boolean;
  isWeekendDay?: boolean;
  isNotCurrentMonthDay?: boolean;
  isSelectedDay?: boolean;
};

export type FirstDayOfWeekType = 'Sunday' | 'Monday';
export type MonthRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type SelectedTime = { day?: number; month: number; year: number };
