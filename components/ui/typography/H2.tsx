import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const H2 = ({ children, className }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={cn(
        'text-[2.5rem] md:text-[3.25rem] leading-[120%] font-bold font-serif',
        className
      )}
    >
      {children}
    </h2>
  );
};

export default H2;
