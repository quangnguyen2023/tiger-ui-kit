import { useId } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const TextField = ({
  label,
  value,
  type,
  placeholder,
  onChange,
  className,
}: TextFieldProps) => {
  // Generate unique ID for input-label connection
  const inputId = useId();

  return (
    <div className={`grid max-w-sm items-center gap-1 bg-white ${className || ''}`}>
      <Label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        type={type}
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  );
};

export default TextField;
