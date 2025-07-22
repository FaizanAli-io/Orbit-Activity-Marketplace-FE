import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const FormSkeleton = () => {
  return (
    <>
      <Skeleton className='w-56 h-10' />
      <div className='space-y-2 my-10'>
        <Skeleton className='w-15 h-5' />
        <Skeleton className='w-full h-10' />
      </div>
      <Skeleton className='w-28 h-10' />

      <div className='flex justify-between my-20'>
        <Skeleton className='w-28 h-10' />
        <Skeleton className='w-28 h-10' />
      </div>
    </>
  );
};

export default FormSkeleton;
