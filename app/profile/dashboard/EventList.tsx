import React, { Suspense } from 'react';

import RecommendedList from './RecommendedList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventListSkeleton from './EventListSkeleton';
import H5 from '@/components/ui/typography/H5';
import LikedActivityList from './LikedActivityList';
import SubsList from './SubsList';
import { EventDateTimeFilter } from './EventDateTimeFilter';
import { Filter } from 'lucide-react';

interface Props {
  page?: string;
  rangeStart?: string;
  rangeEnd?: string;
}

const EventList = async ({ page, rangeStart, rangeEnd }: Props) => {
  return (
    <Tabs defaultValue='best'>
      <div className='w-full md:flex md:justify-between md:items-baseline-last'>
        <div>
          <H5 className='font-medium mb-2'>Events you might like</H5>
          <TabsList className='bg-secondary'>
            <TabsTrigger value='best'>Recommended</TabsTrigger>
            <TabsTrigger value='subs'>Subscribed Events</TabsTrigger>
            <TabsTrigger value='liked'>Liked Events</TabsTrigger>
          </TabsList>
        </div>
        <div className='mt-4 md:mt-0 md:max-w-sm'>
          <div className='w-full flex space-x-2 items-center'>
            <Filter />
            <EventDateTimeFilter className='w-full' />
          </div>
        </div>
      </div>
      <TabsContent value='best'>
        <Suspense fallback={<EventListSkeleton />}>
          <RecommendedList
            page={page}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
          />
        </Suspense>
      </TabsContent>

      <TabsContent value='subs'>
        <Suspense fallback={<EventListSkeleton />}>
          <SubsList />
        </Suspense>
      </TabsContent>

      <TabsContent value='liked'>
        <Suspense fallback={<EventListSkeleton />}>
          <LikedActivityList />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default EventList;
