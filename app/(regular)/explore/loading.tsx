import Block from '@/app/layout/Block';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import ActivityCardSkeleton from '@/components/app/ActivityCard/ActivityCardSkeleton';

export default function Loading() {
  return (
    <Block space={false} className='my-5'>
      {/* Search form skeleton */}
      <div className='my-5'>
        <Skeleton className='h-10 w-full rounded-md' />
      </div>

      <div className='md:grid md:grid-cols-8 md:gap-x-5'>
        {/* Desktop sidebar skeleton */}
        <div className='mt-12 max-h-min  rounded-lg shadow-[0px_4px_4px_0px_#00000040] hidden md:block col-span-2 pb-5'>
          <div className='p-4 space-y-4 '>
            <Skeleton className='h-6 w-24' />
            <div className='space-y-2'>
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className='h-4 w-full' />
              ))}
            </div>
            <Skeleton className='h-6 w-24' />
            <div className='space-y-2'>
              {[1, 2].map(i => (
                <Skeleton key={i} className='h-8 w-full' />
              ))}
            </div>
          </div>
        </div>

        {/* Events list skeleton */}
        <div className='md:col-span-6'>
          {/* Mobile filter button */}
          <div className='md:hidden flex justify-end w-full my-2'>
            <Button
              variant={'secondary'}
              size='icon'
              className='md:hidden'
              disabled
            >
              <Filter />
            </Button>
          </div>

          {/* Events grid skeleton */}
          <div className='space-y-5'>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <ActivityCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </Block>
  );
}
