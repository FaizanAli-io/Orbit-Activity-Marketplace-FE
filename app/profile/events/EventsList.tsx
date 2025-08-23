import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getActivities } from '@/lib/data/activities/get-activities';
import React from 'react';

const EventsList = async () => {
  const { data: activities, error } = await getActivities();
  return (
    <>
      {error && (
        <p className='text-destructive text-center'>Something went wrong</p>
      )}

      <Tabs defaultValue='list'>
        <div className='w-full hidden md:flex md:justify-end'>
          <TabsList>
            <TabsTrigger value='list'>List View</TabsTrigger>
            <TabsTrigger value='grid'>Grid View</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='list'>
          {activities && (
            <div className='space-y-5'>
              {activities.map((item, i) => (
                <ActivityCard {...item} key={i} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value='grid'>
          {activities && (
            <div className='space-y-5 md:grid md:grid-cols-2 md:gap-x-5'>
              {activities.map((item, i) => (
                <ActivityCard variant='grid' {...item} key={i} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default EventsList;
