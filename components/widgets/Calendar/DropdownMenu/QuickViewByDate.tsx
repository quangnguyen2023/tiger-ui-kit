'use client';

import { useContext, useState } from 'react';
import { CalendarContext } from '..';
import { ArrowsUpDownIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Combobox from './Combobox';

type TimeSelectorProps = {
  dates: number[];
  months: number[];
  years: number[];
};

const QuickViewByDate = () => {
  const { selectedTime, changeTime } = useContext(CalendarContext);

  const [enableLunarCalendar, setEnableLunarCalendar] = useState(false);
  const [tempSelectedTime, setTempSelectedTime] = useState(selectedTime);

  const minYear = 1900;
  const maxYear = 2199;
  const years = Array(maxYear - minYear + 1)
    .fill('')
    .map((_, i) => minYear + i);

  const months = Array(12)
    .fill('')
    .map((_, i) => i);

  const dates = Array(31)
    .fill('')
    .map((_, i) => i + 1);

  const onGoToDate = () => {
    changeTime(tempSelectedTime);
  };

  const TimeSelector = ({ dates, months, years }: TimeSelectorProps) => {
    return (
      <div className="flex gap-1">
        <Combobox
          options={dates}
          value={tempSelectedTime.day || 1}
          onChangeVal={(newValue) =>
            setTempSelectedTime({ ...tempSelectedTime, day: newValue })
          }
        />
        <Combobox
          options={months}
          value={tempSelectedTime.month}
          onChangeVal={(newValue) =>
            setTempSelectedTime({ ...tempSelectedTime, month: newValue })
          }
        />
        <Combobox
          options={years}
          value={tempSelectedTime.year}
          onChangeVal={(newValue) =>
            setTempSelectedTime({ ...tempSelectedTime, year: newValue })
          }
        />
      </div>
    );
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

        <TimeSelector dates={dates} months={months} years={years} />
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
          <TimeSelector dates={dates} months={months} years={years} />
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
