'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ActivitySubscriptionsResponse } from '../types/subscription';

interface UseActivityRegistrationsOptions {
  enabled?: boolean;
  refetchInterval?: number;
  staleTime?: number;
}

interface UseActivityRegistrationsResult {
  registrationCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

// Simple in-memory cache for registration data
const registrationCache = new Map<
  number,
  {
    data: number;
    timestamp: number;
    staleTime: number;
  }
>();

export function useActivityRegistrations(
  activityId: number,
  options: UseActivityRegistrationsOptions = {}
): UseActivityRegistrationsResult {
  const { enabled = true, refetchInterval, staleTime = 300000 } = options; // 5 minutes default stale time

  const [registrationCount, setRegistrationCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRegistrations = useCallback(
    async (forceRefresh = false) => {
      if (!enabled) return;

      // Check cache first
      const cached = registrationCache.get(activityId);
      const now = Date.now();

      if (
        !forceRefresh &&
        cached &&
        now - cached.timestamp < cached.staleTime
      ) {
        setRegistrationCount(cached.data);
        setIsLoading(false);
        setError(null);
        setLastUpdated(new Date(cached.timestamp));
        return;
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/activities/${activityId}/subscriptions`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: abortControllerRef.current.signal,
            cache: 'default',
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data: ActivitySubscriptionsResponse = await response.json();

        // Count only active subscriptions
        const activeRegistrations =
          data.data?.filter(sub => sub.status === 'active').length ?? 0;

        // Update cache
        registrationCache.set(activityId, {
          data: activeRegistrations,
          timestamp: now,
          staleTime,
        });

        setRegistrationCount(activeRegistrations);
        setLastUpdated(new Date());
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return; // Request was cancelled, ignore
        }

        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch registrations';
        setError(errorMessage);
        console.error('Error fetching activity registrations:', {
          activityId,
          error: err,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [activityId, enabled, staleTime]
  );

  // Initial fetch
  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  // Polling interval
  useEffect(() => {
    if (!refetchInterval || !enabled) return;

    intervalRef.current = setInterval(() => {
      fetchRegistrations(false); // Use cache if still fresh
    }, refetchInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchRegistrations, refetchInterval, enabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const refetch = useCallback(
    () => fetchRegistrations(true),
    [fetchRegistrations]
  );

  return {
    registrationCount,
    isLoading,
    error,
    refetch,
    lastUpdated,
  };
}
