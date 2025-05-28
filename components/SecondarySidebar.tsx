'use client';

import { useWidgetContext } from '@/contexts/WidgetContext';
import TextField from './base/TextField';
import CustomSwitch from './base/CustomSwitch';
import ColorPalette from './base/ColorPicker';

const SecondarySidebar = () => {
  const { selectedWidget } = useWidgetContext();

  return (
    <div className="flex flex-col gap-6 w-80 border-r border-gray-200 h-screen p-4">
      <TextField label="Title" />
      <CustomSwitch
        label="Size"
        options={[
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
        ]}
      />
      <ColorPalette
        label="Color"
        initialColor="#000000"
        onChange={(color) => {}}
      />
    </div>
  );
};

export default SecondarySidebar;
