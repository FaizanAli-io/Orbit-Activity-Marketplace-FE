import { getActivities } from '@/lib/data/activities/get-activities';
import { getProfile } from '@/lib/data/profile/get-profile';
import React from 'react';
import ActivityCard from './ActivityCard';

const ActivitiesList = async () => {
  const { data: profile } = await getProfile();

  if (!profile || !profile.vendor)
    return <p className='text-center text-2xl'>No Activities Found.</p>;

  const vendorId = profile?.vendor?.id;
  const { data: activities } = await getActivities({
    vendorId: String(vendorId),
  });

  if (!activities || !activities.data.length)
    return <p className='text-center text-2xl'>No Activities Found.</p>;

  return (
    <div className='space-y-3'>
      {activities.data.map(a => (
        <ActivityCard key={a.id} {...a} />
      ))}
    </div>
  );
};

export default ActivitiesList;
