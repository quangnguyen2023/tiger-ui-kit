'use client';

import { useContext, useState } from 'react';
import { CalendarContext } from '..';
import { ArrowsUpDownIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import TimeSelector from '@/components/widgets/Calendar/DropdownMenu/TimeSelector';

const QuickViewByDate = () => {
  const { selectedTime, changeTime } = useContext(CalendarContext);

  const [enableLunarCalendar, setEnableLunarCalendar] = useState(false);
  const [tempSelectedTime, setTempSelectedTime] = useState(selectedTime);

  const onGoToDate = () => {
    changeTime(tempSelectedTime);
  };

  return (
    <div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <SunIcon width={18} height={18} />
            <div className="text-xs font-medium"> Solar date </div>
          </div>
          <div
            className="cursor-pointer rounded p-1 text-xs text-[rgb(35,131,226)] transition-colors select-none hover:bg-[rgba(35,131,226,0.07)]"
            onClick={() => setEnableLunarCalendar(!enableLunarCalendar)}
          >
            {enableLunarCalendar ? 'Hide lunar' : 'Show lunar'}
          </div>
        </div>

        <TimeSelector
          selectedTime={tempSelectedTime}
          onChange={(newTime) => setTempSelectedTime(newTime)}
        />
      </div>

      {enableLunarCalendar && (
        <div className="mt-2 mb-1 flex justify-center">
          <ArrowsUpDownIcon width={14} height={14} color="#888" />
        </div>
      )}

      {enableLunarCalendar && (
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <MoonIcon width={18} height={18} />
            <div className="text-xs font-medium"> Lunar date </div>
          </div>
          <TimeSelector
            selectedTime={tempSelectedTime}
            onChange={(newTime) => setTempSelectedTime(newTime)}
          />
        </div>
      )}

      <button
        className="mt-4 ml-auto block w-full rounded bg-[#2383e2] px-2 py-2 text-xs font-medium text-white transition-colors hover:bg-[#3a83cc] active:bg-[#377abe]"
        onClick={onGoToDate}
      >
        Go to date
      </button>
    </div>
  );
};

export default QuickViewByDate;
