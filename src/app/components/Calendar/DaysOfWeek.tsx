import { useEffect, useState } from 'react';
import { firstDayOfWeekType } from './Calendar';

type DaysOfWeekProps = {
  firstDayOfWeek: firstDayOfWeekType;
};

export default function DaysOfWeek({ firstDayOfWeek }: DaysOfWeekProps) {
  const [daysOfWeek, setDaysOfWeek] = useState([
    { value: 'Mon', isWeekend: false },
    { value: 'Tue', isWeekend: false },
    { value: 'Wed', isWeekend: false },
    { value: 'Thu', isWeekend: false },
    { value: 'Fri', isWeekend: false },
    { value: 'Sat', isWeekend: true },
    { value: 'Sun', isWeekend: true },
  ]);

  useEffect(() => {
    if (firstDayOfWeek === 'Sunday' && daysOfWeek[0].value !== 'Sun') {
      setDaysOfWeek((prev: any) => {
        const sunday = prev.find((day: any) => day.value === 'Sun');
        const otherDays = prev.filter((day: any) => day.value !== 'Sun');
        return [sunday, ...otherDays];
      });
    } else if (firstDayOfWeek === 'Monday' && daysOfWeek[0].value !== 'Mon') {
      setDaysOfWeek((prev: any) => {
        const sunday = prev.find((day: any) => day.value === 'Sun');
        const otherDays = prev.filter((day: any) => day.value !== 'Sun');
        return [...otherDays, sunday];
      });
    }
  }, [firstDayOfWeek]);

  return (
    <div className="grid grid-cols-7 gap-1 mt-2 font-semibold">
      {daysOfWeek.map((day, index) => (
        <div key={index} className={`text-center ${day.isWeekend ? 'text-[#9b9b9b]' : ''}`}>
          {day.value.slice(0, 1)}
        </div>
      ))}
    </div>
  );
}
