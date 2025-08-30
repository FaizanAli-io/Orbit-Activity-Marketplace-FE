'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ReviewSkeleton = () => {
  return (
    <>
      <div className='flex justify-between'>
        <div>
          <Skeleton className='w-lg h-10' />
          <div className='flex space-x-5 mt-2'>
            <Skeleton className='w-20 h-5' />
            <Skeleton className='w-15 h-5' />
            <Skeleton className='w-15 h-5' />
            <Skeleton className='w-15 h-5' />
          </div>
        </div>
        <Skeleton className='w-20 h-10' />
      </div>

      <Skeleton className='w-full h-32 mt-5' />

      <div className='space-y-2 mt-5'>
        <Skeleton className='w-full h-5' />
        <Skeleton className='w-[90%] h-5' />
        <Skeleton className='w-full h-5' />
        <Skeleton className='w-[80%] h-5' />
      </div>

      <Skeleton className='w-full h-24 mt-5' />

      <div className='flex justify-between my-20'>
        <Skeleton className='w-28 h-10' />
        <Skeleton className='w-28 h-10' />
      </div>
    </>
  );
};

export default ReviewSkeleton;
