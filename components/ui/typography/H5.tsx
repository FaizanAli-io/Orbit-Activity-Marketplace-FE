import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const H5 = ({ children, className }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h5
      className={cn(
        'text-[1.25rem] md:text-[1.75rem] leading-[140%] font-bold font-serif',
        className
      )}
    >
      {children}
    </h5>
  );
};

export default H5;
