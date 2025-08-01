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
import { useState } from 'react';

type Props = {
  values: Date[];
  onChange: (date?: Date[]) => void;
  className?: string;
  buttonClass?: string;
};

export function MultipleDatePicker({
  values,
  onChange,
  className,
  buttonClass,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn('w-40 justify-between font-normal', buttonClass)}
            id='date-picker'
            type='button'
          >
            {values.length
              ? `${values.length} Dates selected`
              : 'No date selected'}
            <ChevronDownIcon className='ml-2 h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='multiple'
            required
            selected={values}
            onSelect={onChange}
            className='rounded-lg border shadow-sm'
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
