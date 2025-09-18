import React, { Suspense } from 'react';
import Header from './header';
import Block from '@/app/layout/Block';
import EventList from './EventList';
import HeaderCard from './header/HeaderCard';
import EventListSkeleton from './EventListSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const search = await searchParams;
  const page = search?.page as string;
  const rangeStart = search?.rangeStart as string;
  const rangeEnd = search?.rangeEnd as string;

  return (
    <div>
      <Block
        space={false}
        className='my-10 md:grid md:grid-cols-7 md:gap-x-5  '
      >
        <div className='md:col-span-7 space-y-10'>
          <div className='md:grid md:grid-cols-7 gap-5 space-y-5 md:space-y-0'>
            <div className='md:col-span-5'>
              <Header />
            </div>
            <div className='md:col-span-2'>
              <HeaderCard />
            </div>
          </div>
          <div>
            <Suspense fallback={<EventListSkeleton />}>
              <EventList
                page={page}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
              />
            </Suspense>
          </div>
        </div>
      </Block>
    </div>
  );
};

export default Page;
