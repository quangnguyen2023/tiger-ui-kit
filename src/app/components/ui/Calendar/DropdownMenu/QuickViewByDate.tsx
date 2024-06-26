import { Box, Popper, Stack, TextField, styled } from '@mui/material';
import { useContext, useState } from 'react';
import { CalendarContext } from '../Calendar';
import { ArrowsUpDownIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { PopoverWrapperContext } from '../../../base/PopoverWrapper/PopoverWrapper';
import BaseAutocomplete from '../../../base/Autocomplete';

type TimeSelectorProps = {
  dates: number[];
  months: number[];
  years: number[];
};

const QuickViewByDate = () => {
  const { onClosePopover } = useContext(PopoverWrapperContext);
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
    onClosePopover();
  };

  const TimeSelector = ({ dates, months, years }: TimeSelectorProps) => {
    return (
      <Stack direction="row" spacing={1}>
        <BaseAutocomplete
          options={dates}
          value={tempSelectedTime.day}
          onChangeVal={(newValue) =>
            setTempSelectedTime({ ...tempSelectedTime, day: (newValue as number) || 0 })
          }
        />
        <BaseAutocomplete
          options={months}
          value={tempSelectedTime.month}
          onChangeVal={(newValue) =>
            setTempSelectedTime({ ...tempSelectedTime, month: (newValue as number) || 0 })
          }
        />
        <BaseAutocomplete
          options={years}
          value={tempSelectedTime.year}
          onChangeVal={(newValue) =>
            setTempSelectedTime({ ...tempSelectedTime, year: (newValue as number) || 0 })
          }
        />
      </Stack>
    );
  };

  return (
    <Box>
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <SunIcon width={18} height={18} />
            <div className="text-[0.75rem] font-medium"> Gregorian calendar </div>
          </Stack>
          <div
            className="text-[0.625rem] text-[rgb(35,131,226)] hover:bg-[rgba(35,131,226,0.07)] cursor-pointer p-1 rounded-[4px] transition-colors select-none"
            onClick={() => setEnableLunarCalendar(!enableLunarCalendar)}
          >
            {enableLunarCalendar ? 'Hide lunar' : 'Show lunar'}
          </div>
        </Stack>
        <TimeSelector dates={dates} months={months} years={years} />
      </Stack>

      {enableLunarCalendar && (
        <Stack alignItems="center" mt={1.3} mb={0.3}>
          <ArrowsUpDownIcon width={14} height={14} color="#888" />
        </Stack>
      )}

      {enableLunarCalendar && (
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MoonIcon width={18} height={18} />
            <div className="text-[0.75rem] font-medium"> Lunar calendar </div>
          </Stack>
          <TimeSelector dates={dates} months={months} years={years} />
        </Stack>
      )}

      <button
        className="block w-full ml-auto text-xs bg-[#2383e2] hover:bg-[#3a83cc] active:bg-[#377abe] text-white font-medium py-2 px-2 rounded transition-colors mt-4"
        onClick={onGoToDate}
      >
        Go to date
      </button>
    </Box>
  );
};

export default QuickViewByDate;
