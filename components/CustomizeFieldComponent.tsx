import { CustomizeField, DividerField, ArrayEditorField } from '@/types/widget';
import ColorPicker from './base/ColorPicker';
import TextField from './base/TextField';
import CustomSwitch from './base/CustomSwitch';
import { TimezoneCombobox } from './base/TimezoneCombobox';
import DividerWithLabel from './base/DividerWithLabel';
import ArrayEditor from './base/ArrayEditor';

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
          value={value ?? field.defaultValue}
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
          selectedOption={value ?? field?.options?.[0]?.value}
          onChange={(val) => onChange?.(val)}
        />
      );

    case 'TIMEZONE':
      return (
        <TimezoneCombobox
          label={field.label}
          value={value || field.defaultValue}
          onChange={onChange}
        />
      );

    case 'DIVIDER':
      const dividerField = field as DividerField;
      return <DividerWithLabel label={dividerField.text || dividerField.label} />;

    case 'ARRAY_EDITOR':
      const arrayField = field as ArrayEditorField;
      const arrayValue = value !== undefined ? value : arrayField.defaultValue || [];
      return (
        <ArrayEditor
          value={arrayValue}
          onChange={(newArray) => onChange?.(newArray)}
          itemSchema={arrayField.itemSchema}
          maxItems={arrayField.maxItems}
          minItems={arrayField.minItems}
          itemLabel={arrayField.itemLabel}
        />
      );

    default:
      return null;
  }
};

export default CustomizeFieldComponent;
