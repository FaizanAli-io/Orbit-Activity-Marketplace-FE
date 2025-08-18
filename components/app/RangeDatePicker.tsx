'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type DateRange } from 'react-day-picker';

type RangeDatePickerProps = {
  startValue?: Date;
  endValue?: Date;
  onStartChange?: (date: Date | undefined) => void;
  onEndChange?: (date: Date | undefined) => void;
  className?: string;
  buttonClass?: string;
};

export function RangeDatePicker({
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  className,
  buttonClass,
}: RangeDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: startValue,
    to: endValue,
  });

  useEffect(() => {
    setRange({ from: startValue, to: endValue });
  }, [startValue, endValue]);

  const formatted =
    range?.from && range?.to
      ? `${format(range.from, 'PPP')} - ${format(range.to, 'PPP')}`
      : range?.from
      ? `${format(range.from, 'PPP')} - End date`
      : 'Select date range';

  const handleSelect = (selected: DateRange | undefined) => {
    setRange(selected);
    onStartChange?.(selected?.from);
    onEndChange?.(selected?.to);
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-full justify-between font-normal px-2 py-1 bg-white h-fit shadow-[0px_3px_4px_0px_#00000040] border-none',
              buttonClass
            )}
            id='range-date-picker'
          >
            <span className='truncate max-w-[calc(100%-1.5rem)] text-left'>
              {formatted}
            </span>
            <ChevronDownIcon className='ml-2 h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='range'
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={2}
            captionLayout='dropdown'
            defaultMonth={range?.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
