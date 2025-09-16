'use client';

import DaysOfWeek from './DaysOfWeek';
import DaysOfMonth from './DaysOfMonth';
import MonthNavigator from './MonthNavigator';
import { createContext, useMemo, useState } from 'react';
import { generateDaysOfMonth } from './services';
import { DayOfMonthType, FirstDayOfWeekType, MonthRange, SelectedTime } from './types';

type CalendarProps = {
  enableLunarCalendar?: boolean;
  firstDayOfWeek?: FirstDayOfWeekType;
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
        firstDayOfWeek,
      ),
    [selectedTime, firstDayOfWeek],
  );

  const onMonthChange = (newTime: { day?: number; month: number; year: number }) => {
    setSelectedTime(newTime);
  };

  return (
    <CalendarContext.Provider value={{ selectedTime, changeTime: onMonthChange }}>
      <div className="w-fit rounded-3xl bg-white px-4 py-5 shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] dark:bg-[#2e2e2e]">
        <MonthNavigator selectedTime={selectedTime} onMonthChange={onMonthChange} />

        <div
          className={`${enableLunarCalendar ? 'text-base' : 'text-sm'} mt-5 font-semibold dark:text-white`}
        >
          <DaysOfWeek firstDayOfWeek={firstDayOfWeek} />
          <DaysOfMonth daysOfMonth={daysOfMonth} enableLunarCalendar={enableLunarCalendar} />
        </div>
      </div>
    </CalendarContext.Provider>
  );
}
