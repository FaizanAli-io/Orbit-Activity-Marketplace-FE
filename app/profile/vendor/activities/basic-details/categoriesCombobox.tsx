'use client';

import * as React from 'react';
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
import { cn } from '@/lib/utils';

type Block = {
  group: string;
  categories: { value: string; label: string }[];
};

interface Props {
  options: Block[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function CategoriesCombobox({
  options,
  value: controlledValue,
  onChange,
  placeholder = 'Select Category',
  disabled = false,
  className,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState('');

  // Determine if component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleSelect = (selectedValue: string) => {
    const newValue = selectedValue === value ? '' : selectedValue;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
    setOpen(false);
  };

  // Find the selected option label
  const selectedOption = options
    .flatMap(group => group.categories)
    .find(category => category.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left',
            !value && 'text-muted-foreground',
            className
          )}
        >
          <span className='truncate text-left flex-1'>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
        <Command>
          <CommandInput placeholder='Search categories...' />
          <CommandList>
            <ScrollArea viewportClassName='max-h-[300px]'>
              <CommandEmpty>No category found.</CommandEmpty>
              {options.map(group => (
                <CommandGroup key={group.group} heading={group.group}>
                  {group.categories.map(category => (
                    <CommandItem
                      key={category.value}
                      value={category.label}
                      keywords={[category.label, category.value]}
                      className='justify-start'
                      onSelect={() => handleSelect(category.value)}
                    >
                      <span className='flex gap-2 text-left flex-1'>
                        {category.label}
                      </span>
                      {value === category.value && (
                        <CommandCheck className='ml-auto h-4 w-4' />
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
  );
}
