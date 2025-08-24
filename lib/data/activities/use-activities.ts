import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { useQuery } from '@tanstack/react-query';
import { Activity } from './types';
import { ACTIVITIES_KEY } from '../query-keys';

interface Res {
  data: Activity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const useActivities = () =>
  useQuery({
    queryFn: async () =>
      apiFetch<unknown, Res>('/activities', {
        method: HTTP_VERB.GET,
      }),
    queryKey: ACTIVITIES_KEY,
  });
