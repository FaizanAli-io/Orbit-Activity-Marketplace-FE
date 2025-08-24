import React, { Suspense } from 'react';

import RecommendedList from './RecommendedList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventListSkeleton from './EventListSkeleton';
import H5 from '@/components/ui/typography/H5';
import LikedActivityList from './LikedActivityList';

interface Props {
  page?: string;
}

const EventList = async ({ page }: Props) => {
  return (
    <Tabs defaultValue='best'>
      <div className='w-full md:flex md:justify-between md:items-baseline-last'>
        <div>
          <H5 className='font-medium mb-2'>Events you might like</H5>
          <TabsList className='bg-secondary'>
            <TabsTrigger value='best'>Recommended</TabsTrigger>
            <TabsTrigger value='liked'>Liked Events</TabsTrigger>
          </TabsList>
        </div>
      </div>
      <TabsContent value='best'>
        <Suspense fallback={<EventListSkeleton />}>
          <RecommendedList page={page} />
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
