'use client';

import { useId, useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

const CustomSwitch = ({ label, selectedOption, options, onChange }: CustomSwitchType) => {
  const [selectedValue, setSelectedValue] = useState(selectedOption);

  const id = useId();

  const handleOptionChange = (value: string | number | boolean) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
      </Label>
      <div
        id={id}
        className="flex w-full items-center gap-2 rounded-full bg-gray-200 p-1"
      >
        {options.map((option) => (
          <Button
            key={option.value.toString()}
            variant="ghost"
            className={cn(
              'h-fit flex-1 rounded-full px-4 py-2 text-xs font-semibold hover:bg-white hover:font-semibold hover:shadow',
              {
                'bg-white shadow-sm': option.value === selectedValue,
                'text-gray-500': option.value !== selectedValue,
              },
            )}
            onClick={() => handleOptionChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CustomSwitch;
