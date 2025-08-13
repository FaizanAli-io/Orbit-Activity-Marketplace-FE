import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const H1 = ({ children, className }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      className={cn(
        'text-[2.75rem] md:text-[4.5rem] leading-[120%] font-bold font-serif',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default H1;
