import ActivitiesPagination from '@/app/(regular)/explore/ActivitiesPagination';
import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import { getUserSubs } from '@/lib/data/activities/get-user-subs';

const SubsList = async () => {
  const { data, error } = await getUserSubs();

  const activities = data?.data;

  const pagination = data?.pagination;

  if (error || !activities)
    return (
      <div className='h-[50vh] grid place-content-center'>
        <p className='text-destructive text-center'>Something went wrong</p>
      </div>
    );

  if (!activities.length)
    return (
      <div className='h-[50vh] grid place-content-center '>
        <p className='text-center'>No activity found.</p>
      </div>
    );

  return (
    <div>
      <div className='space-y-5'>
        {activities?.map(item => (
          <ActivityCard {...item} key={item.id} />
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

export default SubsList;
