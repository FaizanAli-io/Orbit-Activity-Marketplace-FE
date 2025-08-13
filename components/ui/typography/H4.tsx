import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const H4 = ({ children, className }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h4
      className={cn(
        'text-[1.5rem] md:text-[2.25rem] leading-[130%] font-bold font-serif',
        className
      )}
    >
      {children}
    </h4>
  );
};

export default H4;
