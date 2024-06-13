import { DayOfMonthType } from './Calendar';

type DaysOfMonthProps = {
  daysOfMonth: DayOfMonthType[];
  enableLunarCalendar?: boolean;
};

export default function DaysOfMonth({ daysOfMonth, enableLunarCalendar }: DaysOfMonthProps) {
  return (
    <div className="grid grid-cols-7 mt-2 gap-1.5 gap-y-2">
      {daysOfMonth.map((day, index) => (
        <div
          key={index}
          className={`
            relative border-[1.5px] border-transparent
            ${day?.isCurrentDay ? 'bg-[#f64338] text-white rounded-full' : ''} 
            ${!day?.isCurrentDay && day?.isWeekendDay ? 'text-[#949494] dark:text-[#a8a8a8]' : ''}  
            ${day?.isNotCurrentMonthDay ? 'text-[#dbdbdb] dark:text-[#5d5d5d]' : ''} 
            ${day?.isSelectedDay ? '!border-[#f64338]' : ''}
            ${enableLunarCalendar ? 'p-5 rounded-md' : 'p-3.5'} 
          `}
        >
          <div
            className={`
              absolute ${enableLunarCalendar ? 'top-[60%]' : 'top-1/2'} left-1/2 -translate-x-1/2 -translate-y-1/2 
              flex flex-col items-center
            `}
          >
            <span className="">{day.value}</span>

            {enableLunarCalendar && day.value && (
              <span
                className={`
                  -mt-2 ml-4 text-[0.55rem] 
                  ${!day?.isCurrentDay && day?.isWeekendDay ? 'text-[#9b9b9b]' : ''}
                  ${day.lunarValue?.date === 1 && !day?.isCurrentDay ? 'text-red-500' : ''}
                `}
              >
                {day.lunarValue?.date === 1
                  ? `${day.lunarValue?.date}/${day.lunarValue?.month}`
                  : day.lunarValue?.date}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
