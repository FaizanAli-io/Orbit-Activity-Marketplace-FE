import { getActivities } from '@/lib/data/activities/get-activities';
import { getProfile } from '@/lib/data/profile/get-profile';
import ActivitiesListClient from './ActivitiesListClient';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  limit?: number;
}

const ActivitiesList = async ({ limit, ...props }: Props) => {
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
    <ActivitiesListClient
      initialActivities={activities.data}
      limit={limit}
      {...props}
    />
  );
};

export default ActivitiesList;
