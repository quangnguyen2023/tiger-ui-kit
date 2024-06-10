import DaysOfWeek from './DaysOfWeek';
import DaysOfMonth from './DaysOfMonth';
import { LunarDate } from 'vietnamese-lunar-calendar';
import MonthNavigator from './MonthNavigator';
import { createContext, useMemo, useState } from 'react';
import { generateDaysOfMonth } from './services';

export type DayOfMonthType = {
  value: number;
  lunarValue?: LunarDate;
  isCurrentDay?: boolean;
  isWeekendDay?: boolean;
  isNotCurrentMonthDay?: boolean;
  isSelectedDay?: boolean;
};
export type firstDayOfWeekType = 'Sunday' | 'Monday';
export type MonthRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
type SelectedTime = { day?: number; month: number; year: number };

type CalendarProps = {
  enableLunarCalendar?: boolean;
  firstDayOfWeek?: firstDayOfWeekType;
};

export const CalendarContext = createContext({
  selectedTime: {} as SelectedTime,
  changeTime: (newTime: SelectedTime) => {},
});

export default function Calendar({
  enableLunarCalendar = true,
  firstDayOfWeek = 'Sunday',
}: CalendarProps) {
  const [selectedTime, setSelectedTime] = useState<SelectedTime>({
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const daysOfMonth = useMemo(
    () =>
      generateDaysOfMonth(
        selectedTime.day,
        selectedTime.month as MonthRange,
        selectedTime.year,
        firstDayOfWeek
      ),
    [selectedTime, firstDayOfWeek]
  );

  const onMonthChange = (newTime: { day?: number; month: number; year: number }) => {
    setSelectedTime(newTime);
  };

  return (
    <CalendarContext.Provider value={{ selectedTime, changeTime: onMonthChange }}>
      <div className="w-fit bg-[#2e2e2e] rounded-3xl py-5 px-4">
        <MonthNavigator selectedTime={selectedTime} onMonthChange={onMonthChange} />

        <div
          className={`${enableLunarCalendar ? 'text-base' : 'text-sm'} font-semibold text-white mt-5`}
        >
          <DaysOfWeek firstDayOfWeek={firstDayOfWeek} />
          <DaysOfMonth daysOfMonth={daysOfMonth} enableLunarCalendar={enableLunarCalendar} />
        </div>
      </div>
    </CalendarContext.Provider>
  );
}
