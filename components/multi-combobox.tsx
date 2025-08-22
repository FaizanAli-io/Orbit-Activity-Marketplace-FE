'use client';

import * as React from 'react';
import { Badge, BadgeButton } from '@/components/ui/badge';
import { Button, ButtonArrow } from '@/components/ui/button';
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
import { X } from 'lucide-react';

type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type Group = {
  group: string;
  options: Option[];
};

interface MultiGroupComboboxProps {
  groups: Group[];
  value?: string[]; // controlled
  defaultValue?: string[]; // uncontrolled
  onChange?: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export function MultiGroupCombobox({
  groups,
  value,
  defaultValue = [],
  onChange,
  placeholder = 'Select options',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
}: MultiGroupComboboxProps) {
  const [open, setOpen] = React.useState(false);

  // Support both controlled & uncontrolled usage
  const [internalValues, setInternalValues] = React.useState(defaultValue);
  const selectedValues = value ?? internalValues;

  const setSelectedValues = (vals: string[]) => {
    if (!value) {
      setInternalValues(vals);
    }
    onChange?.(vals);
  };

  const toggleSelection = (val: string) => {
    setSelectedValues(
      selectedValues.includes(val)
        ? selectedValues.filter(v => v !== val)
        : [...selectedValues, val]
    );
  };

  const removeSelection = (val: string) => {
    setSelectedValues(selectedValues.filter(v => v !== val));
  };

  // Flattened list for label lookup
  const flatOptions = groups.flatMap(g => g.options);

  React.useEffect(() => {
    console.log(selectedValues);
  }, [selectedValues]);

  return (
    <div className='w-full'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            autoHeight={true}
            mode='input'
            placeholder={selectedValues.length === 0}
            className='w-full p-1 relative bg-transparent'
          >
            <div className='flex flex-wrap items-center gap-1 pe-2.5'>
              {selectedValues.length > 0 ? (
                selectedValues.map(val => {
                  const opt = flatOptions.find(o => o.value === val);
                  return opt ? (
                    <Badge key={val} variant='outline'>
                      {opt.label}
                      <BadgeButton
                        onClick={e => {
                          e.stopPropagation();
                          removeSelection(val);
                        }}
                      >
                        <X />
                      </BadgeButton>
                    </Badge>
                  ) : null;
                })
              ) : (
                <span className='px-2.5'>{placeholder}</span>
              )}
            </div>
            <ButtonArrow className='absolute top-2 end-3' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-(--radix-popper-anchor-width) p-0'>
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
                        value={option.value}
                        onSelect={() => toggleSelection(option.value)}
                      >
                        <span className='flex items-center gap-2'>
                          {option.icon && (
                            <span className='text-sm'>{option.icon}</span>
                          )}
                          {option.label}
                        </span>
                        {selectedValues.includes(option.value) && (
                          <CommandCheck />
                        )}
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
    </div>
  );
}
