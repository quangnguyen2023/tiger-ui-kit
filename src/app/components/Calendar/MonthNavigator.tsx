import { format } from 'date-fns';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import DropdownMenu from './DropdownMenu/DropdownMenu';

type MonthNavigatorProps = {
  selectedTime: { month: number; year: number };
  onMonthChange: (newTime: { month: number; year: number }) => void;
};

export default function MonthNavigator({ selectedTime, onMonthChange }: MonthNavigatorProps) {
  const date = new Date(selectedTime.year, selectedTime.month);

  return (
    <div className="flex items-center justify-between group">
      <div className="col-span-4 text-[#f64338] font-semibold uppercase flex items-center ml-3">
        {format(date, 'MMMM yyyy')}
      </div>

      <div
        className="
          col-span-3 text-black dark:text-white flex justify-center items-center gap-1 font-medium 
          opacity-0 group-hover:opacity-100 transition-all duration-300
        "
      >
        <div
          className="
            p-1 opacity-60 transition-opacity hover:opacity-100 hover:bg-[#eee] dark:hover:bg-[#555] 
            rounded-full cursor-pointer flex justify-center
          "
          onClick={() =>
            onMonthChange({
              month: selectedTime.month - 1,
              year: selectedTime.year,
            })
          }
        >
          <ChevronUpIcon width={22} height={22} />
        </div>

        <div
          className="
            py-1 px-2 opacity-60 transition-opacity hover:opacity-100 hover:bg-[#eee] dark:hover:bg-[#555] 
            rounded-full cursor-pointer text-xs
          "
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
          className="
            flex justify-center p-1 opacity-60 transition-opacity hover:opacity-100 hover:bg-[#eee] 
            dark:hover:bg-[#555] rounded-full cursor-pointer
          "
          onClick={() =>
            onMonthChange({
              month: selectedTime.month + 1,
              year: selectedTime.year,
            })
          }
        >
          <ChevronDownIcon width={22} height={22} />
        </div>

        <DropdownMenu />
      </div>
    </div>
  );
}
