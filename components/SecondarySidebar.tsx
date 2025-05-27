'use client';

import { useWidgetContext } from '@/contexts/WidgetContext';
import TextField from './base/TextField';
import CustomSwitch from './base/CustomSwitch';

const SecondarySidebar = () => {
  const { selectedWidget } = useWidgetContext();

  return (
    <div className="flex flex-col gap-5 w-80 border-r border-gray-200 h-screen p-4">
      <TextField label="Title" />
      <CustomSwitch
        label="Size"
        options={[
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
        ]}
      />
    </div>
  );
};

export default SecondarySidebar;
