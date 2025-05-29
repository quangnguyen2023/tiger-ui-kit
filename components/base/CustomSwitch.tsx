'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

const CustomSwitch = ({
  label,
  selectedOption,
  options,
  onChange,
}: CustomSwitchType) => {
  const [selectedValue, setSelectedValue] = useState(
    selectedOption || options[0]?.value
  );

  const id = `switch-${Math.random().toString(36).slice(2, 11)}`;

  const handleOptionChange = (value: string | number) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div className="flex gap-2 flex-col">
      <Label htmlFor={id} className="font-semibold">
        {label}
      </Label>
      <div
        id={id}
        className="flex w-full items-center gap-2 p-1 bg-gray-200 rounded-full"
      >
        {options.map((option) => (
          <Button
            key={option.value}
            variant="ghost"
            className={cn(
              'flex-1 px-4 py-2 h-fit rounded-full text-xs font-semibold hover:bg-white hover:shadow hover:font-semibold',
              {
                'bg-white shadow-sm': option.value === selectedValue,
                'text-gray-500': option.value !== selectedValue,
              }
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
