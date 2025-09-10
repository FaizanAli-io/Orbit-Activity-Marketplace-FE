'use client';

import { useActivityRegistrations } from '@/lib/data/activities/hooks/use-activity-registrations';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { memo } from 'react';

interface ActivityRegistrationCountProps {
  activityId: number;
  fallbackValue?: number;
  showRefreshButton?: boolean;
  className?: string;
}

export const ActivityRegistrationCount = memo(
  function ActivityRegistrationCount({
    activityId,
    fallbackValue = 0,
    showRefreshButton = false,
    className = '',
  }: ActivityRegistrationCountProps) {
    const { registrationCount, isLoading, error, refetch } =
      useActivityRegistrations(activityId, {
        enabled: true,
        refetchInterval: 30000, // Refetch every 30 seconds
      });

    const handleRefresh = async () => {
      await refetch();
    };

    if (isLoading) {
      // Since we're using Suspense, we can return the count immediately
      // The skeleton is handled by the Suspense boundary
      return <span className={className}>0</span>;
    }

    if (error) {
      return (
        <div className={`flex items-center gap-1 ${className}`}>
          <span className='text-muted-foreground'>{fallbackValue}</span>
          <div title={error}>
            <AlertCircle className='h-3 w-3 text-destructive' />
          </div>
          {showRefreshButton && (
            <Button
              variant='ghost'
              size='sm'
              className='h-auto p-1'
              onClick={handleRefresh}
              title='Retry fetching registrations'
            >
              <RefreshCw className='h-3 w-3' />
            </Button>
          )}
        </div>
      );
    }

    return <span className={className}>{registrationCount}</span>;
  }
);
