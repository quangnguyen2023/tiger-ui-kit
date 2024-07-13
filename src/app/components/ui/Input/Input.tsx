import { TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { HTMLInputTypeAttribute, useEffect, useState } from 'react';

type InputProps = {
  type?: HTMLInputTypeAttribute;
  value?: any;
  onChange?: (value: string) => void;
};

export default function Input({ value = '', type = 'text', onChange }: InputProps) {
  const [inputVal, setInputVal] = useState(value);

  const handleChange = (newInputVal: string) => {
    setInputVal(newInputVal);
    onChange?.(newInputVal);
  };

  useEffect(() => {
    setInputVal(value);
  }, [value]);

  if (type === 'number') {
    return (
      <NumericFormat
        customInput={TextField}
        className='bg-white'
        size="small"
        thousandSeparator
        value={inputVal}
        onValueChange={(valueObj) => handleChange(valueObj.value)}
      />
    );
  }

  return (
    <TextField
      className='bg-white'
      type={type}
      size="small"
      value={inputVal}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
