import React from 'react';

import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import H5 from '@/components/ui/typography/H5';
import { getActivities } from '@/lib/data/activities/get-activities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EventList = async () => {
  const { data: activities, error } = await getActivities();

  if (error)
    return <p className='text-destructive text-center'>Something went wrong</p>;

  return (
    <Tabs defaultValue='best'>
      <div className='w-full hidden md:flex md:justify-between md:items-baseline-last'>
        <div>
          <H5 className='font-medium'>Events you might like</H5>
          <TabsList className='bg-secondary'>
            <TabsTrigger value='best'>Best Matches</TabsTrigger>
            <TabsTrigger value='recent'>Most Recent</TabsTrigger>
            <TabsTrigger value='saved'>Saved Events</TabsTrigger>
          </TabsList>
        </div>
      </div>
      <TabsContent value='best'>
        {activities && (
          <div className='space-y-5'>
            {activities.map((item, i) => (
              <ActivityCard {...item} key={i} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default EventList;
