import React, { Suspense } from 'react';
import Header from './header';
import Block from '@/app/layout/Block';
import EventList from './EventList';
import HeaderCard from './header/HeaderCard';
import EventListSkeleton from './EventListSkeleton';

const Page = () => {
  return (
    <div>
      <Block space={false} className='my-10 md:grid md:grid-cols-7 md:gap-x-5'>
        <div className='md:col-span-5'>
          <Header />
          <Suspense fallback={<EventListSkeleton />}>
            <EventList />
          </Suspense>
        </div>
        <div className='md:col-span-2'>
          <HeaderCard />
        </div>
      </Block>
    </div>
  );
};

export default Page;
