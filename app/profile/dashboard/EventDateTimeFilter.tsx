'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DateTimeRangeFilter } from '@/components/app/DateTimeRangeFilter';

interface Props {
  className?: string;
}

export function EventDateTimeFilter({ className }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleDateTimeRangeChange = (
    rangeStart?: string,
    rangeEnd?: string
  ) => {
    // Only set loading when there's an actual change to the date range filters
    const currentRangeStart = searchParams.get('rangeStart');
    const currentRangeEnd = searchParams.get('rangeEnd');

    const hasRangeChange =
      currentRangeStart !== rangeStart || currentRangeEnd !== rangeEnd;

    if (hasRangeChange) {
      setLoading(true);
    }

    const params = new URLSearchParams(searchParams.toString());

    if (rangeStart && rangeEnd) {
      params.set('rangeStart', rangeStart);
      params.set('rangeEnd', rangeEnd);
    } else {
      params.delete('rangeStart');
      params.delete('rangeEnd');
    }

    // Keep the current page parameter if it exists
    const currentPage = searchParams.get('page');
    if (currentPage) {
      params.set('page', currentPage);
    }

    const newUrl = `/profile/dashboard${
      params.toString() ? `?${params.toString()}` : ''
    }`;
    router.push(newUrl);
  };

  // Reset loading state when date range parameters specifically change
  useEffect(() => {
    const currentRangeStart = searchParams.get('rangeStart');
    const currentRangeEnd = searchParams.get('rangeEnd');

    // Only reset loading if we were actually loading (to avoid unnecessary resets)
    if (loading) {
      setLoading(false);
    }
  }, [searchParams.get('rangeStart'), searchParams.get('rangeEnd')]);

  const handleClearFilters = () => {
    // Set loading state for clear action
    setLoading(true);

    const params = new URLSearchParams(searchParams.toString());
    params.delete('rangeStart');
    params.delete('rangeEnd');

    // Keep the current page parameter if it exists
    const currentPage = searchParams.get('page');
    if (currentPage) {
      params.set('page', currentPage);
    }

    const newUrl = `/profile/dashboard${
      params.toString() ? `?${params.toString()}` : ''
    }`;
    router.push(newUrl);
  };

  return (
    <DateTimeRangeFilter
      onDateTimeRangeChange={handleDateTimeRangeChange}
      onClearFilters={handleClearFilters}
      className={className}
      loading={loading}
    />
  );
}
