import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  pad?: boolean; // padding x
  space?: boolean; // margin y
}

const Block = ({
  children,
  className,
  space = true,
  pad = true,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={cn(' px-5 md:px-0', className, {
        'max-w-6xl mx-auto': pad,
        'my-20': space,
      })}
    >
      {children}
    </div>
  );
};

export default Block;
