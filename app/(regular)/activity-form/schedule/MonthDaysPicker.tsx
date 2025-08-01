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
<<<<<<< HEAD
import { useState } from 'react';
=======
import { useEffect, useState } from 'react';
>>>>>>> 8487054194f5ec70b0e77ce50ae5f5aa13d143e7

type Props = {
  range: { from: Date; to: Date };
  days: number[];
  onDaysChange: (values: number[]) => void;
  className?: string;
  buttonClass?: string;
};

export function MonthlyDatePicker({
<<<<<<< HEAD
=======
  days,
>>>>>>> 8487054194f5ec70b0e77ce50ae5f5aa13d143e7
  onDaysChange,
  className,
  range,
  buttonClass,
}: Props) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Date[]>([]);

  const handleChange = (data: Date[]) => {
    setValues(data);
    onDaysChange(data.map(date => date.getDate()));
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn('w-40 justify-between font-normal', buttonClass)}
            id='date-picker'
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
            disabled={{
              before: range.from,
              after: range.to,
            }}
            selected={values}
            onSelect={handleChange}
            className='rounded-lg border shadow-sm'
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
