import { format, getDaysInMonth, isSaturday, isSunday } from 'date-fns';
import DaysOfWeek from './DaysOfWeek';
import DaysOfMonth from './DaysOfMonth';

export type DayOfMonthType = {
  value: number;
  isCurrentDay: boolean;
  isWeekendDay: boolean;
};

export default function Calendar() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const totalDaysOfMonth = getDaysInMonth(currentDate);

  const daysOfMonth: DayOfMonthType[] = (() => {
    let days = [];

    const firstWeekDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const numOfEmptyPositions = firstWeekDayOfMonth === 0 ? 6 : firstWeekDayOfMonth - 1;
    days.push(...Array(numOfEmptyPositions).fill(''));

    for (let i = 1; i <= totalDaysOfMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);

      days.push({
        value: i,
        isCurrentDay: i === currentDate.getDate(),
        isWeekendDay: isSaturday(date) || isSunday(date),
      });
    }
    return days;
  })();

  return (
    <div className=" bg-black rounded-3xl font-semibold py-5 px-7">
      <div className="text-[#f64338]  uppercase">{format(currentDate, 'MMM')}</div>

      <div className="text-sm text-white -mx-2">
        <DaysOfWeek />
        <DaysOfMonth daysOfMonth={daysOfMonth} />
      </div>
    </div>
  );
}
