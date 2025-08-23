import ActivityCardSkeleton from '@/components/app/ActivityCard/ActivityCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface Props {
  variant?: 'list' | 'grid';
}

const EventListSkeleton = ({ variant = 'list' }: Props) => {
  return (
    <div>
      <Skeleton className='h-8 w-2xs mb-2' />
      <Skeleton className='h-8 w-52 mb-5' />

      <div className='space-y-5'>
        {new Array(5).fill(null).map((_, i) => (
          <ActivityCardSkeleton variant={variant} key={i} />
        ))}
      </div>
    </div>
  );
};

export default EventListSkeleton;
