import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { useQuery } from '@tanstack/react-query';
import { Activity } from './types';
import { ACTIVITIES_KEY } from '../query-keys';

export const useActivities = () =>
  useQuery({
    queryFn: async () =>
      apiFetch<unknown, Activity[]>('/activities', {
        method: HTTP_VERB.GET,
      }),
    queryKey: ACTIVITIES_KEY,
  });
