import { format } from 'date-fns';
import ArrowUpIcon from './Icons/ArrowUpIcon';
import ArrowDownIcon from './Icons/ArrowDownIcon';

type MonthNavigatorProps = {
  selectedTime: { month: number; year: number };
  onMonthChange: (newTime: { month: number; year: number }) => void;
};

export default function MonthNavigator({ selectedTime, onMonthChange }: MonthNavigatorProps) {
  const date = new Date(selectedTime.year, selectedTime.month);

  return (
    <div className="grid grid-cols-7">
      <div className=" col-span-4 text-[#f64338] font-semibold uppercase flex items-center ml-3">
        {format(date, 'MMMM yyyy')}
      </div>

      <div className="col-span-3 text-white grid grid-cols-3 font-medium">
        <div
          className="py-1 opacity-60 transition-opacity hover:opacity-100 rounded-md cursor-pointer flex justify-center"
          onClick={() =>
            onMonthChange({
              month: selectedTime.month - 1,
              year: selectedTime.year,
            })
          }
        >
          <ArrowUpIcon width={22} height={22} />
        </div>

        <div
          className="py-1 px-1 opacity-60 transition-opacity hover:opacity-100 rounded-md cursor-pointer text-sm"
          onClick={() =>
            onMonthChange({
              month: new Date().getMonth(),
              year: new Date().getFullYear(),
            })
          }
        >
          Today
        </div>

        <div
          className="py-1 opacity-60 transition-opacity hover:opacity-100 rounded-md cursor-pointer flex justify-center"
          onClick={() =>
            onMonthChange({
              month: selectedTime.month + 1,
              year: selectedTime.year,
            })
          }
        >
          <ArrowDownIcon width={22} height={22} />
        </div>
      </div>
    </div>
  );
}
