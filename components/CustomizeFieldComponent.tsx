import { CustomizeField, SettingsGroupField, DividerField } from '@/types/widget';
import ColorPicker from './base/ColorPicker';
import TextField from './base/TextField';
import CustomSwitch from './base/CustomSwitch';
import { TimezoneCombobox } from './base/TimezoneCombobox';
import SettingsGroupRenderer from './base/SettingsGroupRenderer';
import DividerWithLabel from './base/DividerWithLabel';

interface CustomizeFieldComponentProps {
  field: CustomizeField;
  value?: any;
  onChange?: (value: any) => void;
  allValues?: Record<string, any>; // Thêm prop này để SettingsGroupRenderer có thể access tất cả values
}

const CustomizeFieldComponent = ({
  field,
  value,
  onChange,
  allValues = {},
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

    case 'SETTINGS_GROUP':
      const settingsField = field as SettingsGroupField;
      return (
        <SettingsGroupRenderer
          groups={settingsField.groups}
          values={allValues}
          onChange={(key, value) => {
            const updatedValues = { ...allValues, [key]: value };
            onChange?.({ [key]: value });
          }}
          layout={settingsField.layout}
          columns={settingsField.columns}
        />
      );

    case 'DIVIDER':
      const dividerField = field as DividerField;
      return <DividerWithLabel label={dividerField.text || dividerField.label} />;

    default:
      return null;
  }
};

export default CustomizeFieldComponent;
