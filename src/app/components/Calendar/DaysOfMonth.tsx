import { DayOfMonthType } from './Calendar';

type DaysOfMonthProps = {
  daysOfMonth: DayOfMonthType[];
};

export default function DaysOfMonth({ daysOfMonth }: DaysOfMonthProps) {
  return (
    <div className="grid grid-cols-7 mt-2 gap-1 font-semibold">
      {daysOfMonth.map((day) => (
        <div
          key={day.value}
          className={`
            ${day.isCurrentDay ? 'bg-[#f64338] rounded-full' : ''} 
            ${day.isWeekendDay ? 'text-[#9b9b9b]' : ''} relative p-3.5
          `}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {day.value}
          </span>
        </div>
      ))}
    </div>
  );
}
