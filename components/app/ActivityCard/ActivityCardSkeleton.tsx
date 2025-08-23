import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  variant?: 'list' | 'grid';
}

const ActivityCardSkeleton = ({ variant = 'list' }: Props) => {
  return (
    <div
      className={cn('p-0 overflow-hidden md:gap-2', {
        'md:grid md:grid-cols-3': variant === 'list',
      })}
    >
      <Skeleton className='w-full h-[200px] md:h-full md:w-[300px] order-1 rounded-lg mb-5' />

      <div className={'md:col-span-2'}>
        <div className='flex justify-between items-baseline mb-5'>
          <div>
            <Skeleton className='h-8 w-2xs mb-2' />
            <div className='space-x-1'>
              <Skeleton className='h-6 w-52' />
            </div>
          </div>
        </div>

        <div className='space-y-1'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-2/3' />
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-4 w-5/6' />
        </div>

        <div className='flex space-x-2 mt-5'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>
    </div>
  );
};

export default ActivityCardSkeleton;
