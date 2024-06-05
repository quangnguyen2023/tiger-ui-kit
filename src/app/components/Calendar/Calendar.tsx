import { format, getDaysInMonth, isSaturday, isSunday } from 'date-fns';
import DaysOfWeek from './DaysOfWeek';
import DaysOfMonth from './DaysOfMonth';
import { LunarDate } from 'vietnamese-lunar-calendar';

export type DayOfMonthType = {
  value: number;
  lunarValue?: LunarDate;
  isCurrentDay: boolean;
  isWeekendDay: boolean;
};

type CalendarProps = {
  enableLunarCalendar?: boolean;
};

export default function Calendar({ enableLunarCalendar = true }: CalendarProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const totalDaysOfMonth = getDaysInMonth(currentDate);

  const daysOfMonth: DayOfMonthType[] = (() => {
    let days: DayOfMonthType[] = [];

    // Add empty days before the first day of the month
    const firstWeekDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const numOfEmptyPositions = firstWeekDayOfMonth === 0 ? 6 : firstWeekDayOfMonth - 1;
    days.push(...Array(numOfEmptyPositions).fill(''));

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
    return days;
  })();

  return (
    <div className="w-fit bg-[#2e2e2e] rounded-3xl font-semibold py-5 px-7">
      <div className="text-[#f64338] uppercase">{format(currentDate, 'MMMM')}</div>

      <div className={`${enableLunarCalendar ? 'text-base' : 'text-sm'} text-white -mx-2`}>
        <DaysOfWeek />
        <DaysOfMonth daysOfMonth={daysOfMonth} enableLunarCalendar={enableLunarCalendar} />
      </div>
    </div>
  );
}
