import ActivitiesPagination from '@/app/(regular)/explore/ActivitiesPagination';
import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import { getRecommendedActivities } from '@/lib/data/activities/get-recommended-activities';

interface Props {
  page?: string;
  rangeStart?: string;
  rangeEnd?: string;
}

const RecommendedList = async ({ page, rangeStart, rangeEnd }: Props) => {
  const { data, error } = await getRecommendedActivities({
    page,
    rangeStart,
    rangeEnd,
  });

  const activities = data?.data;

  const pagination = data?.pagination;

  if (error || !activities)
    return (
      <div className='h-[50vh] md:w-[70vw] grid place-content-center'>
        <p className='text-destructive text-center'>Something went wrong</p>
      </div>
    );

  if (!activities.length)
    return (
      <div className='h-[50vh] md:w-[70vw] grid place-content-center'>
        <p className='text-center'>No activity found.</p>
      </div>
    );

  return (
    <div>
      <div className='space-y-5'>
        {activities?.map(item => (
          <ActivityCard
            viewLink={`/event/${item.id}`}
            {...item}
            key={item.id}
          />
        ))}
      </div>

      {pagination && (
        <ActivitiesPagination
          baseURL={'/profile/dashboard'}
          className='my-10'
          {...pagination}
        />
      )}
    </div>
  );
};

export default RecommendedList;
