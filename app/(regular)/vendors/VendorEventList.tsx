import ActivitiesPagination from '@/app/(regular)/explore/ActivitiesPagination';
import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getActivities } from '@/lib/data/activities/get-activities';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  vendorId: string;
}

const VendorEventsList = async ({ vendorId, ...props }: Props) => {
  const { data, error } = await getActivities({
    vendorId,
  });

  const activities = data?.data;
  const pagination = data?.pagination;

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
                <ActivityCard
                  viewLink={`/event/${item.id}`}
                  {...item}
                  key={i}
                />
              ))}
            </div>
          ) : (
            <p className='text-center'>No result found</p>
          )}
        </TabsContent>

        <TabsContent value='grid'>
          {activities && (
            <div
              {...props}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 items-start'
            >
              {activities.map((item, i) => (
                <ActivityCard
                  variant='grid'
                  viewLink={`/event/${item.id}`}
                  {...item}
                  key={i}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {pagination && (
        <ActivitiesPagination
          baseURL={`/vendors/${vendorId}`}
          className='my-10'
          {...pagination}
        />
      )}
    </>
  );
};

export default VendorEventsList;
