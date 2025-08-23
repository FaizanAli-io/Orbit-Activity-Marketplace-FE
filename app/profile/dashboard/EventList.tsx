import React from 'react';

import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import H5 from '@/components/ui/typography/H5';
import { getActivities } from '@/lib/data/activities/get-activities';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getLikedActivities } from '@/lib/data/activities/get-liked-activities';

const EventList = async () => {
  const { data: activities, error } = await getActivities();
  const { data: likedActivities, error: likedError } =
    await getLikedActivities();

  return (
    <Tabs defaultValue='liked'>
      <div className='w-full hidden md:flex md:justify-between md:items-baseline-last'>
        <div>
          <H5 className='font-medium mb-2'>Events you might like</H5>
          <TabsList className='bg-secondary'>
            <TabsTrigger value='best'>Best Matches</TabsTrigger>
            <TabsTrigger value='liked'>Liked Events</TabsTrigger>
          </TabsList>
        </div>
      </div>
      <TabsContent value='best'>
        {error && (
          <p className='text-destructive text-center'>Something went wrong</p>
        )}

        {activities && (
          <div className='space-y-5'>
            {activities.map(item => (
              <ActivityCard {...item} key={item.id} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value='liked'>
        {likedError && (
          <p className='text-destructive text-center'>Something went wrong</p>
        )}

        {!likedActivities || !likedActivities.length ? (
          <p className='text-center'>You have'nt liked any activity.</p>
        ) : (
          <div className='space-y-5'>
            {likedActivities.map(item => (
              <ActivityCard {...item} key={item.id} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default EventList;
