import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const VerifySkeleton = () => {
  return (
    <div className='flex flex-col space-y-5'>
      <Skeleton className='w-full h-24 md:h-15' />
      <div className='space-y-2'>
        <Skeleton className='max-w-5xl h-8' />
        <Skeleton className='max-w-5xl h-8' />
      </div>
    </div>
  );
};

export default VerifySkeleton;
