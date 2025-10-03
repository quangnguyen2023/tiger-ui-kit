import { useState, useEffect, useMemo } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadTimezones = async () => {
      try {
        // Use setTimeout to defer loading and avoid blocking initial render
        await new Promise((resolve) => setTimeout(resolve, 0));
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

  // Memoize formatted timezones to avoid recalculation
  const formattedTimezones = useMemo(() => {
    return timezones.map((tz) => ({
      value: tz,
      label: formatTimezoneForDisplay(tz),
      searchText: formatTimezoneForDisplay(tz).toLowerCase(),
    }));
  }, [timezones]);

  // Filter and limit results for performance
  const filteredTimezones = useMemo(() => {
    if (!searchQuery) {
      // Show only popular timezones initially
      const popularTimezones = [
        'UTC',
        'America/New_York',
        'America/Los_Angeles',
        'America/Chicago',
        'Europe/London',
        'Europe/Paris',
        'Europe/Berlin',
        'Asia/Tokyo',
        'Asia/Shanghai',
        'Asia/Singapore',
        'Asia/Kolkata',
        'Asia/Dubai',
        'Australia/Sydney',
        'Pacific/Auckland',
      ];

      return formattedTimezones
        .filter((tz) => popularTimezones.includes(tz.value))
        .slice(0, 15); // Limit to 15 items initially
    }

    return formattedTimezones
      .filter((tz) => tz.searchText.includes(searchQuery.toLowerCase()))
      .slice(0, 50); // Limit search results to 50 items
  }, [formattedTimezones, searchQuery]);

  const selectedTimezone = timezones.find((tz) => tz === value);
  const displayValue = selectedTimezone
    ? formatTimezoneForDisplay(selectedTimezone)
    : 'Select timezone...';

  return (
    <div className={cn('flex flex-col gap-1', className)}>
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
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search timezone..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No timezone found.</CommandEmpty>
              <CommandGroup>
                {filteredTimezones.map((timezone) => (
                  <CommandItem
                    key={timezone.value}
                    value={timezone.value}
                    onSelect={(currentValue: string) => {
                      onChange?.(currentValue);
                      setOpen(false);
                      setSearchQuery(''); // Reset search on selection
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === timezone.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <span className="truncate">{timezone.label}</span>
                  </CommandItem>
                ))}
                {!searchQuery && filteredTimezones.length === 15 && (
                  <div className="px-2 py-1 text-center text-xs text-gray-500">
                    Type to search all {timezones.length} timezones...
                  </div>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
