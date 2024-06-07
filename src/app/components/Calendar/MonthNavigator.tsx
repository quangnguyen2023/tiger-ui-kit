import { format } from 'date-fns';
import ArrowUpIcon from './Icons/ArrowUpIcon';
import ArrowDownIcon from './Icons/ArrowDownIcon';

export default function MonthNavigator() {
  const currentDate = new Date();
  return (
    <div className="grid grid-cols-7">
      <div className=" col-span-4 text-[#f64338] font-semibold uppercase flex items-center ml-3">
        {format(currentDate, 'MMMM')}
      </div>

      <div className="col-span-3 text-white grid grid-cols-3 font-medium">
        <div className="py-1 opacity-60 transition-opacity hover:opacity-100 rounded-md cursor-pointer flex justify-center">
          <ArrowUpIcon width={25} height={25} />
        </div>
        <div className="py-1 px-1 opacity-60 transition-opacity hover:opacity-100 rounded-md cursor-pointer">
          Today
        </div>
        <div className="py-1 opacity-60 transition-opacity hover:opacity-100 rounded-md cursor-pointer flex justify-center">
          <ArrowDownIcon width={25} height={25} />
        </div>
      </div>
    </div>
  );
}
