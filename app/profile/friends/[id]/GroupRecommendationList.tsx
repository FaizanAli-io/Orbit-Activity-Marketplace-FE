import ActivitiesPagination from '@/app/(regular)/explore/ActivitiesPagination';
import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import { getGroupRecommendation } from '@/lib/data/activities/get-group-recommendation';

interface Props {
  page?: string;
  friendId: number;
}

const GroupRecommendationList = async ({ page, friendId }: Props) => {
  const { data, error } = await getGroupRecommendation({ page, friendId });

  const activities = data?.data;

  const pagination = data?.pagination;

  if (error || !activities)
    return <p className='text-destructive text-center'>Something went wrong</p>;

  if (!activities.length)
    return <p className='text-center'>No activity found.</p>;

  return (
    <div>
      <div className='space-y-5'>
        {activities?.map(item => (
          <ActivityCard
            {...item}
            key={item.id}
            viewLink={`/event/${item.id}`}
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

export default GroupRecommendationList;
