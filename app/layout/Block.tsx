import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

const Block = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn('my-20', className)}>
      {children}
    </div>
  );
};

export default Block;
