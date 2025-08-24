import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getActivities } from '@/lib/data/activities/get-activities';
import React from 'react';

interface Props {
  name?: string;
}

const EventsList = async ({ name }: Props) => {
  const { data, error } = await getActivities({ name });

  const activities = data?.data;
  const isEmpty = !activities?.length;

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
          {activities && activities.length ? (
            <div className='space-y-5'>
              {activities.map((item, i) => (
                <ActivityCard {...item} key={i} />
              ))}
            </div>
          ) : (
            <p className='text-center'>No result found</p>
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
