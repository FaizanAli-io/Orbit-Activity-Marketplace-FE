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
import { ChevronDownIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type DateRange } from 'react-day-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type DateTimeRangeFilterProps = {
  onDateTimeRangeChange?: (rangeStart?: string, rangeEnd?: string) => void;
  onClearFilters?: () => void;
  className?: string;
  buttonClass?: string;
  loading?: boolean;
};

export function DateTimeRangeFilter({
  onDateTimeRangeChange,
  onClearFilters,
  className,
  buttonClass,
  loading = false,
}: DateTimeRangeFilterProps) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');

  const formatted =
    range?.from && range?.to
      ? `${format(range.from, 'MMM dd')} - ${format(range.to, 'MMM dd, yyyy')}`
      : range?.from
      ? `${format(range.from, 'MMM dd, yyyy')} - End date`
      : 'Select date & time range';

  const handleDateRangeChange = (selected: DateRange | undefined) => {
    setRange(selected);
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
  };

  const handleApply = () => {
    if (range?.from && range?.to) {
      // Create start datetime: combine start date with start time
      const startDate = new Date(range.from);
      const [startHours, startMinutes] = startTime.split(':');
      startDate.setHours(
        parseInt(startHours, 10),
        parseInt(startMinutes, 10),
        0,
        0
      );

      // Create end datetime: combine end date with end time
      const endDate = new Date(range.to);
      const [endHours, endMinutes] = endTime.split(':');
      endDate.setHours(parseInt(endHours, 10), parseInt(endMinutes, 10), 0, 0);

      const rangeStart = startDate.toISOString();
      const rangeEnd = endDate.toISOString();

      onDateTimeRangeChange?.(rangeStart, rangeEnd);
    }
    setOpen(false);
  };

  const handleClear = () => {
    setRange(undefined);
    setStartTime('00:00');
    setEndTime('23:59');
    onClearFilters?.();
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-full justify-between font-normal px-3 py-2 bg-white h-fit shadow-sm border',
              loading && 'opacity-70 cursor-wait',
              buttonClass
            )}
            id='datetime-range-filter'
            disabled={loading}
          >
            <span className='truncate max-w-[calc(100%-1.5rem)] text-left text-sm'>
              {loading ? 'Applying filter...' : formatted}
            </span>
            {loading ? (
              <Loader2 className='ml-2 h-4 w-4 animate-spin' />
            ) : (
              <ChevronDownIcon className='ml-2 h-4 w-4' />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-4' align='start'>
          <div className='space-y-4'>
            <Calendar
              mode='range'
              selected={range}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
              showOutsideDays={false}
              captionLayout='dropdown'
              defaultMonth={range?.from}
              disabled={loading}
            />

            {range?.from && range?.to && (
              <div className='space-y-3 border-t pt-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='start-time' className='text-xs font-medium'>
                      Start Time
                    </Label>
                    <Input
                      id='start-time'
                      type='time'
                      value={startTime}
                      onChange={e => handleStartTimeChange(e.target.value)}
                      className='h-8 text-sm'
                      disabled={loading}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='end-time' className='text-xs font-medium'>
                      End Time
                    </Label>
                    <Input
                      id='end-time'
                      type='time'
                      value={endTime}
                      onChange={e => handleEndTimeChange(e.target.value)}
                      className='h-8 text-sm'
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className='flex justify-between'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleClear}
                    className='h-8'
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className='mr-1 h-3 w-3 animate-spin' />
                        Applying...
                      </>
                    ) : (
                      'Clear'
                    )}
                  </Button>
                  <Button
                    size='sm'
                    onClick={handleApply}
                    className='h-8'
                    disabled={loading}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
