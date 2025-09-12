import Block from '@/app/layout/Block';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Loading() {
  return (
    <Block space={false} className='my-10'>
      <Tabs defaultValue='month'>
        <div className='w-full flex md:justify-end'>
          <TabsList className='bg-secondary'>
            <TabsTrigger value='month'>Month View</TabsTrigger>
            <TabsTrigger value='agenda'>Agenda</TabsTrigger>
            <TabsTrigger className='hidden md:block' value='week'>
              Week View
            </TabsTrigger>
            <TabsTrigger value='year'>Year View</TabsTrigger>
          </TabsList>
        </div>
        <div className='bg-white p-5 shadow-theme'>
          {/* Calendar skeleton */}
          <div className='space-y-4'>
            {/* Calendar header */}
            <div className='flex justify-between items-center'>
              <Skeleton className='h-8 w-32' />
              <div className='flex space-x-2'>
                <Skeleton className='h-8 w-8' />
                <Skeleton className='h-8 w-8' />
              </div>
            </div>

            {/* Calendar grid */}
            <div className='grid grid-cols-7 gap-1'>
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div
                  key={day}
                  className='p-2 text-center text-sm font-medium text-gray-500'
                >
                  {day}
                </div>
              ))}

              {/* Calendar cells */}
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className='aspect-square border border-gray-200'>
                  <Skeleton className='h-full w-full' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </Block>
  );
}
