import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';
import { Separator } from './separator';

const LabeledSeparator = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn('flex items-center gap-4', className)}>
      <Separator className='flex-1' />
      <span className='text-muted-foreground text-sm text-neutral-light'>
        {children}
      </span>
      <Separator className='flex-1' />
    </div>
  );
};

export default LabeledSeparator;
