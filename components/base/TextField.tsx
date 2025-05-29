import { Input } from '../ui/input';
import { Label } from '../ui/label';

const TextField = ({ label, type, placeholder, onChange }: TextFieldProps) => {
  // Generate unique ID for input-label connection
  const inputId = `${type}-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <div className="grid max-w-sm items-center gap-1.5">
      <Label htmlFor={inputId} className="font-semibold">
        {label}
      </Label>
      <Input
        type={type}
        id={inputId}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
