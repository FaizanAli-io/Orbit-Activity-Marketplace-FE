import Block from '@/app/layout/Block';
import ActivityCardSkeleton from '@/components/app/ActivityCard/ActivityCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Block space={false} className='my-10 md:grid md:grid-cols-7 md:gap-x-5'>
      <div className='md:col-span-5 space-y-10'>
        {/* Header skeleton */}
        <div className='space-y-8 md:space-y-0'>
          <Skeleton className='h-24 md:h-40  w-full' />

          {/* Mobile header card skeleton */}
          <div className='md:hidden'>
            <Skeleton className='h-32 w-full rounded-lg' />
          </div>
        </div>

        {/* Event list skeleton */}
        <div className='space-y-4'>
          {[1, 2, 3].map(i => (
            <ActivityCardSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Desktop header card skeleton */}
      <div className='md:col-span-2 hidden md:block'>
        <Skeleton className='h-40 w-full rounded-lg' />
      </div>
    </Block>
  );
}
