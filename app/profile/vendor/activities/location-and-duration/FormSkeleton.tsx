import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const FormSkeleton = () => {
  return (
    <>
      <Skeleton className='w-72 h-10 mb-10' />
      <div className='space-y-2 mb-5'>
        <Skeleton className='w-15 h-5' />
        <Skeleton className='w-full h-10' />
      </div>

      <div className='space-y-2 my-5'>
        <Skeleton className='w-15 h-5' />
        <Skeleton className='w-full h-10' />
      </div>

      <div className='flex space-x-2'>
        <div className='space-y-1'>
          <Skeleton className='w-15 h-5' />
          <Skeleton className='w-44 h-10' />
        </div>
        <div className='space-y-1'>
          <Skeleton className='w-15 h-5' />
          <Skeleton className='w-44 h-10' />
        </div>
        <div className='space-y-1'>
          <Skeleton className='w-15 h-5' />
          <Skeleton className='w-44 h-10' />
        </div>
      </div>

      <div className='flex justify-between my-20'>
        <Skeleton className='w-28 h-10' />
        <Skeleton className='w-28 h-10' />
      </div>
    </>
  );
};

export default FormSkeleton;
