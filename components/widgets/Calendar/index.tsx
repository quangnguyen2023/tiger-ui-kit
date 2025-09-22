'use client';

import DaysOfWeek from './DaysOfWeek';
import DaysOfMonth from './DaysOfMonth';
import MonthNavigator from './MonthNavigator';
import { createContext, useMemo, useState } from 'react';
import { generateDaysOfMonth } from './services';
import { FirstDayOfWeekType, MonthRange, SelectedTime, WeekdayFormatType } from './types';
import { getWidgetSize } from '@/configs/widgetSizes';
import { WidgetType } from '@/types/widget';

type CalendarProps = {
  enableLunarCalendar?: boolean;
  firstDayOfWeek?: FirstDayOfWeekType;
  weekdayFormat?: WeekdayFormatType;
  accentColor?: string;
  textColor?: string;
  bgColor?: string;
};

export const CalendarContext = createContext({
  selectedTime: {} as SelectedTime,
  changeTime: (newTime: SelectedTime) => {},
});

export default function Calendar({
  enableLunarCalendar = true,
  firstDayOfWeek = 'Sunday',
  weekdayFormat = '1-char',
  accentColor = '#f64338',
  textColor = 'black',
  bgColor = 'white',
}: CalendarProps) {
  const size = getWidgetSize(WidgetType.CALENDAR);

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
      <div
        className="rounded-3xl px-4 py-5 shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] select-none dark:bg-[#2e2e2e]"
        style={{ width: size.width, height: size.height, backgroundColor: bgColor }}
      >
        <MonthNavigator
          selectedTime={selectedTime}
          onMonthChange={onMonthChange}
          accentColor={accentColor}
        />

        <div
          className={`${enableLunarCalendar ? 'text-base' : 'text-sm'} mt-5 font-semibold dark:text-white`}
        >
          <DaysOfWeek
            firstDayOfWeek={firstDayOfWeek}
            weekdayFormat={weekdayFormat}
            textColor={textColor}
          />
          <DaysOfMonth
            daysOfMonth={daysOfMonth}
            enableLunarCalendar={enableLunarCalendar}
            accentColor={accentColor}
            textColor={textColor}
          />
        </div>
      </div>
    </CalendarContext.Provider>
  );
}
