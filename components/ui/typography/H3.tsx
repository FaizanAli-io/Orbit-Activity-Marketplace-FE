import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const H3 = ({ children, className }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn(
        'text-[2rem] md:text-[2.75rem] leading-[120%] font-bold font-serif',
        className
      )}
    >
      {children}
    </h3>
  );
};

export default H3;
