'use client';

import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useState } from 'react';

type DatePickerProps = {
  value?: Date;
  onChange?: (date?: Date) => void;
  className?: string;
};

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-40 justify-between font-normal'
            id='date-picker'
          >
            {value ? format(value, 'PPP') : 'Select date'}
            <ChevronDownIcon className='ml-2 h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            selected={value}
            onSelect={date => {
              onChange?.(date);
              setOpen(false);
            }}
            captionLayout='dropdown'
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
