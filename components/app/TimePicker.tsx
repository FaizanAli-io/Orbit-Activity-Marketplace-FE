import React from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

type TimePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  className?: string;
};

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  id = 'time-picker',
  className = '',
}) => {
  return (
    <Input
      type='time'
      id={id}
      step='1'
      value={value}
      onChange={e => {
        const raw = e.target.value; // e.g. "16:00:00"
        const formatted = raw.slice(0, 5); // take only "HH:mm"
        onChange?.(formatted);
      }}
      className={cn('bg-background max-w-full', className)}
    />
  );
};

export default TimePicker;
