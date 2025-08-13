import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const H6 = ({ children, className }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h6
      className={cn(
        'text-[1.125rem] md:text-[1.375rem] leading-[140%] font-bold font-serif',
        className
      )}
    >
      {children}
    </h6>
  );
};

export default H6;
