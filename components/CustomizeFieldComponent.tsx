import { CustomizeField } from '@/types/widget';
import ColorPicker from './base/ColorPicker';
import TextField from './base/TextField';
import CustomSwitch from './base/CustomSwitch';

interface CustomizeFieldComponentProps {
  field: CustomizeField;
  value?: any;
  onChange?: (value: any) => void;
}

const CustomizeFieldComponent = ({
  field,
  value,
  onChange,
}: CustomizeFieldComponentProps) => {
  switch (field.type) {
    case 'COLOR':
      return (
        <ColorPicker
          label={field.label}
          initialColor={value || field.defaultValue}
          onChange={onChange}
        />
      );

    case 'TEXT':
      return (
        <TextField
          label={field.label}
          value={value || field.defaultValue}
          placeholder={field.label}
          onChange={(e) => onChange?.(e.target.value)}
        />
      );

    case 'NUMBER':
      return (
        <TextField
          label={field.label}
          value={value || field.defaultValue}
          type="number"
          placeholder={field.label}
          onChange={(e) => onChange?.(e.target.value)}
        />
      );

    case 'SWITCHER':
      return (
        <CustomSwitch
          label={field.label}
          options={field.options || []}
          selectedOption={value || field?.options?.[0]?.value}
          onChange={(val) => onChange?.(val)}
        />
      );
  }
};

export default CustomizeFieldComponent;
