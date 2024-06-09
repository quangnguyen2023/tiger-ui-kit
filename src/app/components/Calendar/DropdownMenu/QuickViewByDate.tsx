import { Autocomplete, Box, Popper, Stack, TextField, Typography, styled } from '@mui/material';
import { useContext, useState } from 'react';
import { CalendarContext } from '../Calendar';
import { format } from 'date-fns';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { ArrowsUpDownIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';

type TimeSelectorProps = {
  dates: number[];
  months: number[];
  years: number[];
};

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    padding: '2px !important',
    fontSize: '0.875rem',
  },
});

const StyledPopper = styled(Popper)({
  '& .MuiAutocomplete-listbox': {
    fontSize: '0.875rem',
  },
});

const CustomTypography = styled(Typography)({
  fontSize: '0.875rem',
});

const QuickViewByDate = () => {
  const { selectedTime, changeTime } = useContext(CalendarContext);
  const [enableLunarCalendar, setEnableLunarCalendar] = useState(false);

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

  const TimeSelector = ({ dates, months, years }: TimeSelectorProps) => {
    return (
      <Stack direction="row" spacing={1}>
        <Autocomplete
          disablePortal
          disableClearable
          blurOnSelect
          size="small"
          options={dates}
          sx={{ width: 60 }}
          renderInput={(params) => <CustomTextField {...params} placeholder="Date" />}
          getOptionLabel={(option) => `${option}`}
          popupIcon={<ChevronDownIcon width={20} height={20} color="#bfbebc" />}
          PopperComponent={(props) => <StyledPopper {...props} />}
          value={selectedTime.day}
          onChange={(_, newValue) => {
            changeTime({ ...selectedTime, day: (newValue as number) || 0 });
          }}
        />

        <Autocomplete
          disablePortal
          disableClearable
          blurOnSelect
          size="small"
          options={months}
          sx={{ width: 110 }}
          renderInput={(params) => <CustomTextField {...params} placeholder="Month" />}
          getOptionLabel={(option) => format(new Date(selectedTime.year, option), 'MMMM')}
          popupIcon={<ChevronDownIcon width={20} height={20} color="#bfbebc" />}
          PopperComponent={(props) => <StyledPopper {...props} />}
          value={selectedTime.month}
          onChange={(_, newValue) => {
            changeTime({ ...selectedTime, month: (newValue as number) || 0 });
          }}
        />

        <Autocomplete
          disablePortal
          disableClearable
          blurOnSelect
          size="small"
          options={years}
          sx={{ width: 80 }}
          renderInput={(params) => <CustomTextField {...params} placeholder="Year" />}
          getOptionLabel={(option) => option.toString()}
          popupIcon={<ChevronDownIcon width={20} height={20} color="#bfbebc" />}
          PopperComponent={(props) => <StyledPopper {...props} />}
          value={selectedTime.year}
          onChange={(_, newValue) => {
            changeTime({ ...selectedTime, year: (newValue as number) || 0 });
          }}
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
            <CustomTypography> Dương lịch </CustomTypography>
          </Stack>
          <div
            className="text-[0.75rem] text-[rgb(35,131,226)] hover:bg-[rgba(35,131,226,0.07)] cursor-pointer p-1 rounded-[4px] transition-colors"
            onClick={() => setEnableLunarCalendar(!enableLunarCalendar)}
          >
            {enableLunarCalendar ? 'Ẩn âm lịch' : 'Hiện âm lịch'}
          </div>
        </Stack>
        <TimeSelector dates={dates} months={months} years={years} />
      </Stack>

      {enableLunarCalendar && (
        <Stack alignItems="center" mt={1.5} mb={0.5}>
          <ArrowsUpDownIcon width={16} height={16} />
        </Stack>
      )}

      {enableLunarCalendar && (
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MoonIcon width={18} height={18} />
            <CustomTypography> Âm lịch </CustomTypography>
          </Stack>
          <TimeSelector dates={dates} months={months} years={years} />
        </Stack>
      )}
    </Box>
  );
};

export default QuickViewByDate;
