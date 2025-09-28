'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn, isObject } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type ComboboxProps = {
  label?: string;
  options: number[] | { value: any; label: string; [key: string]: any }[];
  value: number;
  onChangeVal: (newValue: number) => void;
};

export default function Combobox({ label, options, value, onChangeVal }: ComboboxProps) {
  const [open, setOpen] = useState(false);

  // Helper để lấy value và label
  const getOptionValue = (option: any) => (isObject(option) ? option.value : option);
  const getOptionLabel = (option: any) => (isObject(option) ? option.label : option);

  return (
    <>
      {label && <label className="mb-1 block text-sm font-semibold">{label}</label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-8 w-20 justify-between px-2 text-sm"
          >
            {getOptionLabel(
              options.find((opt) => getOptionValue(opt) === value) ?? value,
            )}
            <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-28 p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const optionValue = getOptionValue(option);
                  const optionLabel = getOptionLabel(option);
                  return (
                    <CommandItem
                      key={optionValue}
                      value={optionValue.toString()}
                      onSelect={(currentValue: string) => {
                        onChangeVal(Number(currentValue));
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === optionValue ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {String(optionLabel)}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
