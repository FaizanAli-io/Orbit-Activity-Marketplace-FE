'use client';

import { Activity } from '@/lib/data/activities/types';
import ActivityCard from './ActivityCard';
import { HTMLAttributes, useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  initialActivities: Activity[];
  limit?: number;
}

const ActivitiesListClient = ({
  initialActivities,
  limit,
  className,
  ...props
}: Props) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const deletedActivitiesRef = useRef<Activity[]>([]);

  const handleActivityDeleted = useCallback(
    (deletedActivityId: number) => {
      // Store the deleted activity for potential recovery
      const deletedActivity = activities.find(
        activity => activity.id === deletedActivityId
      );
      if (deletedActivity) {
        deletedActivitiesRef.current.push(deletedActivity);
      }

      // Optimistically remove from UI
      setActivities(prev =>
        prev.filter(activity => activity.id !== deletedActivityId)
      );
    },
    [activities]
  );

  const handleDeleteFailed = useCallback((failedActivityId: number) => {
    // Restore the activity if deletion failed
    const failedActivity = deletedActivitiesRef.current.find(
      activity => activity.id === failedActivityId
    );

    if (failedActivity) {
      setActivities(prev => [...prev, failedActivity]);
      deletedActivitiesRef.current = deletedActivitiesRef.current.filter(
        activity => activity.id !== failedActivityId
      );
    }
  }, []);

  if (!activities || !activities.length) {
    return <p className='text-center text-2xl'>No Activities Found.</p>;
  }

  return (
    <div
      className={cn(
        'space-y-3 md:grid md:grid-cols-2 md:space-y-0 md:gap-5',
        className
      )}
      {...props}
    >
      {activities.map(activity => (
        <ActivityCard
          key={activity.id}
          {...activity}
          onDeleted={handleActivityDeleted}
          onDeleteFailed={handleDeleteFailed}
        />
      ))}
    </div>
  );
};

export default ActivitiesListClient;
