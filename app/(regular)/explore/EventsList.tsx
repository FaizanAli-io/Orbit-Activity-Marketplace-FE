import ActivitiesPagination from '@/app/(regular)/explore/ActivitiesPagination';
import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getActivities } from '@/lib/data/activities/get-activities';

interface Props {
  name?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
  baseURL?: string;
}

const EventsList = async ({
  name,
  categoryId,
  minPrice: min,
  maxPrice: max,
  page: _page,
  baseURL = '/explore',
}: Props) => {
  const minPrice = !Number.isNaN(min) ? min : undefined;
  const maxPrice = !Number.isNaN(max) ? max : undefined;
  const page = !Number.isNaN(_page) ? _page : undefined;

  const { data, error } = await getActivities({
    name,
    categoryId,
    minPrice,
    maxPrice,
    page,
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
            <div className='space-y-5 md:grid md:grid-cols-2 md:gap-x-5'>
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
          baseURL={baseURL}
          className='my-10'
          {...pagination}
        />
      )}
    </>
  );
};

export default EventsList;
