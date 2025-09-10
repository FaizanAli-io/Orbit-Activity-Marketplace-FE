'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandCheck,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ChevronDown } from 'lucide-react';

// Types
type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode; // could be emoji, svg, etc
};

type Group = {
  group: string;
  options: Option[];
};

type Props = {
  groups: Group[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
  disable?: boolean;
};

export default function GroupCombobox({
  groups,
  placeholder = 'Select option',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
  value: controlledValue,
  onChange,
  disable = false,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState('');
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleSelect = (val: string) => {
    const newValue = val === value ? '' : val;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    setOpen(false);
  };

  const flatOptions = groups.flatMap(group => group.options);
  const selectedLabel = flatOptions.find(opt => opt.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className='p-0' disabled={disable}>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='px-2 py-1 bg-white h-fit shadow-[0px_3px_4px_0px_#00000040] border-none'
          disabled={disable}
        >
          <span className={cn('truncate text-sm')}>
            {selectedLabel ?? placeholder}
          </span>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='min-w-fit w-(--radix-popper-anchor-width) p-0 m-0'>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <ScrollArea viewportClassName='max-h-[300px]'>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              {groups.map(group => (
                <CommandGroup key={group.group} heading={group.group}>
                  {group.options.map(option => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      keywords={[option.label, option.value]}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <span className='flex items-center gap-2'>
                        {option.icon && (
                          <span className='text-sm'>{option.icon}</span>
                        )}
                        {option.label}
                      </span>
                      {value === option.value && <CommandCheck />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <ScrollBar />
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
