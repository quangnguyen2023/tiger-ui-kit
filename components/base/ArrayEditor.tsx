import React from 'react';
import { SettingItem } from '@/types/widget';
import TextField from './TextField';
import ColorPicker from './ColorPicker';
import CustomSwitch from './CustomSwitch';
import { TimezoneCombobox } from './TimezoneCombobox';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import {
  timezoneToLocation,
  shouldAutoUpdateLocation,
} from '@/lib/timezoneLocationUtils';

interface ArrayEditorProps {
  value: any[];
  onChange: (newArray: any[]) => void;
  itemSchema: Record<string, SettingItem>;
  maxItems?: number;
  minItems?: number;
  itemLabel?: string;
}

const ArrayEditor: React.FC<ArrayEditorProps> = ({
  value = [],
  onChange,
  itemSchema,
  maxItems = 10,
  minItems = 0,
  itemLabel = 'Item',
}) => {
  const renderFieldForItem = (
    item: SettingItem,
    itemIndex: number,
    currentValue: any,
  ) => {
    const fieldValue = currentValue?.[item.key] ?? item.defaultValue;

    const handleChange = (newValue: any) => {
      const newArray = [...value];
      newArray[itemIndex] = {
        ...newArray[itemIndex],
        [item.key]: newValue,
      };

      // Special handling for timezone changes - auto-update location if appropriate
      if (item.key === 'timezone' && itemSchema.location) {
        const currentLocation = newArray[itemIndex].location;
        if (shouldAutoUpdateLocation(currentLocation, newValue)) {
          const suggestedLocation = timezoneToLocation(newValue);
          newArray[itemIndex].location = suggestedLocation;
        }
      }

      onChange(newArray);
    };

    switch (item.type) {
      case 'text':
        return (
          <TextField
            label={item.label}
            value={fieldValue || ''}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case 'timezone':
        return (
          <TimezoneCombobox
            label={item.label}
            value={fieldValue || ''}
            onChange={(newValue) => handleChange(newValue)}
          />
        );
      case 'color':
        return (
          <ColorPicker
            label={item.label}
            initialColor={fieldValue || '#000000'}
            onChange={(newValue) => handleChange(newValue)}
          />
        );
      case 'switch':
        return (
          <CustomSwitch
            label={item.label}
            selectedOption={fieldValue || false}
            options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
            onChange={(newValue) => handleChange(newValue)}
          />
        );
      default:
        return null;
    }
  };

  const addItem = () => {
    if (value.length < maxItems) {
      const newItem: any = {};
      // Khởi tạo với default values
      Object.entries(itemSchema).forEach(([key, schema]) => {
        newItem[key] = schema.defaultValue;
      });

      // Special handling for timezone-location items
      if (itemSchema.timezone && itemSchema.location && newItem.timezone) {
        const suggestedLocation = timezoneToLocation(newItem.timezone);
        newItem.location = suggestedLocation;
      }

      onChange([...value, newItem]);
    }
  };

  const removeItem = (index: number) => {
    if (value.length > minItems) {
      const newArray = value.filter((_, i) => i !== index);
      onChange(newArray);
    }
  };

  return (
    <div className="space-y-4">
      {value.map((item, index) => (
        <div key={index} className="rounded-lg border border-gray-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-medium">
              {itemLabel} {index + 1}
            </h4>
            {value.length > minItems && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {Object.entries(itemSchema).map(([key, schema]) => (
              <div key={key}>{renderFieldForItem(schema, index, item)}</div>
            ))}
          </div>
        </div>
      ))}

      {value.length < maxItems && (
        <Button variant="outline" onClick={addItem} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add {itemLabel}
        </Button>
      )}
    </div>
  );
};

export default ArrayEditor;
