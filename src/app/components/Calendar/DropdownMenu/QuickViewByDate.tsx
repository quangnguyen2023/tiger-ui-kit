import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import { useContext } from 'react';
import { CalendarContext } from '../Calendar';

export default function QuickViewByDate() {
  const { selectedTime, changeTime } = useContext(CalendarContext);

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

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Autocomplete
          disablePortal
          disableClearable
          blurOnSelect
          size="small"
          options={dates}
          sx={{ width: 100 }}
          renderInput={(params) => <TextField {...params} label="Date" />}
          getOptionLabel={(option) => option.toString()}
          defaultValue={selectedTime.day}
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
          sx={{ width: 100 }}
          renderInput={(params) => <TextField {...params} label="Month" />}
          getOptionLabel={(option) => (option + 1).toString()}
          defaultValue={selectedTime.month}
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
          sx={{ width: 120 }}
          renderInput={(params) => <TextField {...params} label="Year" />}
          getOptionLabel={(option) => option.toString()}
          defaultValue={selectedTime.year}
          onChange={(_, newValue) => {
            changeTime({ ...selectedTime, year: (newValue as number) || 0 });
          }}
        />
      </Stack>
    </Box>
  );
}
