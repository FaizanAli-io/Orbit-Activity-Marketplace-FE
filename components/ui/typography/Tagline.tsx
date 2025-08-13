import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const H5 = ({ children, className }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <span
      className={cn(
        'text-[1rem] leading-[150%] font-bold inline-block font-serif',
        className
      )}
    >
      {children}
    </span>
  );
};

export default H5;
