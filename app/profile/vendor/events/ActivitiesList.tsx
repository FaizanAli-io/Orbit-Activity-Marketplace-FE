import { getActivities } from '@/lib/data/activities/get-activities';
import { getProfile } from '@/lib/data/profile/get-profile';
import ActivityCard from './ActivityCard';
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  limit?: number;
}

const ActivitiesList = async ({ limit, className, ...props }: Props) => {
  const { data: profile } = await getProfile();

  if (!profile || !profile.vendor)
    return <p className='text-center text-2xl'>No Activities Found.</p>;

  const vendorId = profile?.vendor?.id;
  const { data: activities } = await getActivities({
    vendorId: String(vendorId),
    limit,
  });

  if (!activities || !activities.data.length)
    return <p className='text-center text-2xl'>No Activities Found.</p>;

  return (
    <div
      className={cn(
        'space-y-3 md:grid md:grid-cols-2 md:space-y-0 md:gap-5',
        className
      )}
      {...props}
    >
      {activities.data.map(a => (
        <ActivityCard key={a.id} {...a} />
      ))}
    </div>
  );
};

export default ActivitiesList;
