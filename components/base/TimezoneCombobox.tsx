import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  getAvailableTimezones,
  formatTimezoneForDisplay,
} from '@/services/timezoneService';
import { Check, ChevronsUpDown } from 'lucide-react';
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

interface TimezoneComboboxProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const TimezoneCombobox = ({
  label,
  value,
  onChange,
  className,
}: TimezoneComboboxProps) => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadTimezones = () => {
      try {
        const availableTimezones = getAvailableTimezones();
        setTimezones(availableTimezones);
      } catch (error) {
        console.error('Failed to load timezones:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTimezones();
  }, []);

  const selectedTimezone = timezones.find((tz) => tz === value);
  const displayValue = selectedTimezone
    ? formatTimezoneForDisplay(selectedTimezone)
    : 'Select timezone...';

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={isLoading}
          >
            <span className="truncate">
              {isLoading ? 'Loading timezones...' : displayValue}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0"
          style={{ width: 'var(--radix-popover-trigger-width)' }}
        >
          <Command>
            <CommandInput placeholder="Search timezone..." />
            <CommandList>
              <CommandEmpty>No timezone found.</CommandEmpty>
              <CommandGroup>
                {timezones.map((timezone) => (
                  <CommandItem
                    key={timezone}
                    value={timezone}
                    onSelect={(currentValue: string) => {
                      onChange?.(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === timezone ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <span className="truncate">{formatTimezoneForDisplay(timezone)}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
