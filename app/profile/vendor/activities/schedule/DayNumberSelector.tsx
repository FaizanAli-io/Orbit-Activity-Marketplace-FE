'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface DaySelectorProps {
  selected?: number[];
  onSelectionChange?: (days: number[]) => void;
  mode?: 'month' | 'week';
  maxDays?: number;
  className?: string;
  readonly?: boolean;
}

const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function DayNumberSelector({
  selected = [],
  onSelectionChange,
  mode = 'month',
  maxDays = 31,
  readonly = false,
  className,
}: DaySelectorProps) {
  const [selectedSet, setSelectedSet] = React.useState<Set<number>>(
    new Set(selected)
  );

  React.useEffect(() => {
    setSelectedSet(new Set(selected));
  }, [selected]);

  const toggleValue = (value: number) => {
    if (readonly) return;

    const next = new Set(selectedSet);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    setSelectedSet(next);
    onSelectionChange?.(Array.from(next).sort((a, b) => a - b));
  };

  const days =
    mode === 'month'
      ? Array.from({ length: maxDays }, (_, i) => i + 1)
      : Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className={cn('p-2', className)}>
      <div
        className={cn(
          'grid gap-2',
          mode === 'week' ? 'grid-cols-7' : 'grid-cols-7'
        )}
      >
        {days.map(day => (
          <div
            key={day}
            onClick={() => toggleValue(day)}
            className={cn(
              'size-8 rounded-md text-sm font-medium transition-colors flex items-center justify-center',
              'focus-visible:outline-none',
              {
                'bg-primary text-primary-foreground': selectedSet.has(day),
                'bg-transparent': !selectedSet.has(day),
                'w-10': mode === 'week',
                'cursor-default opacity-80': readonly,
                'cursor-pointer hover:bg-accent hover:text-accent-foreground':
                  !readonly,
              }
            )}
            aria-disabled={readonly}
          >
            {mode === 'week' ? weekdayLabels[day] : day}
          </div>
        ))}
      </div>
    </div>
  );
}
