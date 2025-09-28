import React, { ChangeEvent } from 'react';
import { SettingGroup, SettingItem } from '@/types/widget';
import TextField from './TextField';
import ColorPicker from './ColorPicker';
import CustomSwitch from './CustomSwitch';
import { TimezoneCombobox } from '@/components/base/TimezoneCombobox';
import { cn } from '@/lib/utils';

interface SettingsGroupRendererProps {
  groups: SettingGroup[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  layout?: 'grid' | 'stack' | 'tabs';
  columns?: number;
}

const SettingsGroupRenderer: React.FC<SettingsGroupRendererProps> = ({
  groups,
  values,
  onChange,
  layout = 'stack',
  columns = 1,
}) => {
  const renderSettingItem = (item: SettingItem) => {
    const value = values[item.key] !== undefined ? values[item.key] : item.defaultValue;

    switch (item.type) {
      case 'text':
        return (
          <TextField
            label={item.label}
            value={value || ''}
            onChange={(e) => onChange(item.key, e.target.value)}
            className="w-full"
          />
        );
      case 'timezone':
        return (
          <TimezoneCombobox
            label={item.label}
            value={value || ''}
            onChange={(newValue: string) => onChange(item.key, newValue)}
          />
        );
      case 'color':
        return (
          <ColorPicker
            label={item.label}
            initialColor={value || '#000000'}
            onChange={(newValue) => onChange(item.key, newValue)}
          />
        );
      case 'switch':
        return (
          <CustomSwitch
            label={item.label}
            selectedOption={value || false}
            options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
            onChange={(newValue) => onChange(item.key, newValue)}
          />
        );
      case 'custom':
        // Implement custom component logic if needed
        return <div>Custom component: {item.customComponent}</div>;
      default:
        return null;
    }
  };

  const renderGroup = (group: SettingGroup) => {
    return (
      <div key={group.title} className="mb-4 rounded-lg border border-gray-200 p-4">
        {group.title && <h4 className="mb-2 text-sm font-medium">{group.title}</h4>}
        <div
          className={cn(
            'space-y-3',
            layout === 'grid' && [
              'grid gap-3',
              columns === 1 && 'grid-cols-1',
              columns === 2 && 'grid-cols-2',
              columns === 3 && 'grid-cols-3',
              columns === 4 && 'grid-cols-4',
            ],
          )}
        >
          {group.items.map((item) => (
            <div key={item.key} className="mb-2">
              {renderSettingItem(item)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return <div className="space-y-4">{groups.map(renderGroup)}</div>;
};

export default SettingsGroupRenderer;
