import { format } from 'date-fns';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import DropdownMenu from './DropdownMenu/DropdownMenu';

type MonthNavigatorProps = {
  selectedTime: { month: number; year: number };
  onMonthChange: (newTime: { month: number; year: number }) => void;
};

export default function MonthNavigator({
  selectedTime,
  onMonthChange,
}: MonthNavigatorProps) {
  const date = new Date(selectedTime.year, selectedTime.month);

  return (
    <div className="group flex items-center justify-between">
      <div className="col-span-4 ml-3 flex items-center font-semibold text-[#f64338] uppercase">
        {format(date, 'MMMM yyyy')}
      </div>

      <div className="col-span-3 flex items-center justify-center gap-2 font-medium text-black opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-white">
        <div
          className="flex cursor-pointer justify-center rounded-full bg-[#ddd] p-1 opacity-60 transition-opacity hover:opacity-100 dark:bg-[#555]"
          onClick={() =>
            onMonthChange({
              month: selectedTime.month - 1,
              year: selectedTime.year,
            })
          }
        >
          <ChevronUpIcon width={18} height={18} />
        </div>

        <div
          className="cursor-pointer rounded-full bg-[#ddd] px-2 py-1.5 text-xs opacity-60 transition-opacity hover:opacity-100 dark:bg-[#555]"
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
          className="flex cursor-pointer justify-center rounded-full bg-[#ddd] p-1 opacity-60 transition-opacity hover:opacity-100 dark:bg-[#555]"
          onClick={() =>
            onMonthChange({
              month: selectedTime.month + 1,
              year: selectedTime.year,
            })
          }
        >
          <ChevronDownIcon width={18} height={18} />
        </div>

        <DropdownMenu />
      </div>
    </div>
  );
}
