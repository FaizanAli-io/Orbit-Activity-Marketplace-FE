'use client';

import { formatCurrency } from '@/lib/utils';
import { useActivityRegistrations } from '@/lib/data/activities/hooks/use-activity-registrations';
import { memo } from 'react';

interface ActivityRevenueDynamicProps {
  activityId: string;
  price: number;
  className?: string;
}

export const ActivityRevenueDynamic = memo(function ActivityRevenueDynamic({
  activityId,
  price,
  className = '',
}: ActivityRevenueDynamicProps) {
  const { registrationCount, isLoading, error } = useActivityRegistrations(
    Number(activityId),
    {
      enabled: true,
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );

  if (isLoading) {
    // Since we're using Suspense, return the fallback value immediately
    // The skeleton is handled by the Suspense boundary
    return <span className={className}>{formatCurrency(0)}</span>;
  }

  // Use actual registration count, fallback to 0 if error
  const actualRegistrations = error ? 0 : registrationCount;
  const revenue = actualRegistrations * price;

  return <span className={className}>{formatCurrency(revenue)}</span>;
});
