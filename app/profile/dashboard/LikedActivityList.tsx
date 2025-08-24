import ActivityCard from '@/components/app/ActivityCard/ActivityCard';
import { getLikedActivities } from '@/lib/data/activities/get-liked-activities';
import React from 'react';

const LikedActivityList = async () => {
  const { data, error } = await getLikedActivities();

  const activities = data?.data;
  if (error || !activities)
    return <p className='text-destructive text-center'>Something went wrong</p>;

  if (!activities.length)
    return <p className='text-center'>No activity found.</p>;

  return (
    <div className='space-y-5'>
      {activities?.map(item => (
        <ActivityCard {...item} key={item.id} />
      ))}
    </div>
  );
};

export default LikedActivityList;
