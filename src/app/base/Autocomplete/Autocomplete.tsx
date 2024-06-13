import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { Autocomplete, AutocompleteProps, Popper, TextField, styled } from '@mui/material';

interface BaseAutocompleteProps<Value>
  extends Omit<AutocompleteProps<any, boolean, boolean, boolean>, 'onChange' | 'renderInput'> {
  options: any[];
  value: any;
  onChangeVal: (newValue: any) => void;
}

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    padding: '2px !important',
    fontSize: '0.75rem',
  },
});

const StyledPopper = styled(Popper)({
  '& .MuiAutocomplete-listbox': {
    fontSize: '0.75rem',
  },
});

const BaseAutocomplete = <Value,>({
  options,
  value,
  onChangeVal,
  ...props
}: BaseAutocompleteProps<Value>) => (
  <Autocomplete
    disableClearable
    blurOnSelect
    size="small"
    options={options}
    sx={{ width: 70 }}
    renderInput={(params) => <CustomTextField {...params} placeholder="Date" />}
    getOptionLabel={(option) => `${option}`}
    popupIcon={<ChevronDownIcon width={20} height={20} color="#bfbebc" />}
    PopperComponent={(props) => <StyledPopper {...props} />}
    value={value}
    onChange={(_, newValue) => onChangeVal(newValue)}
    {...props}
  />
);

export default BaseAutocomplete;
