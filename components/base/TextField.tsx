import { useId } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const TextField = ({
  label,
  value,
  type,
  placeholder,
  onChange,
}: TextFieldProps) => {
  // Generate unique ID for input-label connection
  const inputId = useId();

  return (
    <div className="grid max-w-sm items-center gap-1.5">
      <Label htmlFor={inputId} className="font-semibold text-md">
        {label}
      </Label>
      <Input
        type={type}
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
