import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ActivityListSkeleton = () => {
  return (
    <div className='space-y-3 md:grid md:grid-cols-2 md:space-y-0 md:gap-5'>
      <Skeleton className='w-full h-64 block' />
      <Skeleton className='w-full h-64 block' />
      <Skeleton className='w-full h-64 block' />
      <Skeleton className='w-full h-64 block' />
      <Skeleton className='w-full h-64 block' />
      <Skeleton className='w-full h-64 block' />
    </div>
  );
};

export default ActivityListSkeleton;
