import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

const Item = ({ children, className, onClick, ...props }: Props) => {
  return (
    <div
      {...props}
      className={cn(
        'px-5 py-3 border rounded-md flex justify-between items-center gap-2',
        className
      )}
    >
      <div className='flex-1 break-words overflow-hidden'>{children}</div>
      <X size={18} className='cursor-pointer shrink-0' onClick={onClick} />
    </div>
  );
};

export default Item;
