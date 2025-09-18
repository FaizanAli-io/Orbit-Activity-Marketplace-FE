import { Activity } from './types';
import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';

interface params {
  page?: string;
  rangeStart?: string;
  rangeEnd?: string;
}

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

export async function getRecommendedActivities(params: params = {}) {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  let endpoint = '/recommendation/single';
  const queryParams = [];

  if (params.page) {
    queryParams.push(`page=${encodeURIComponent(params.page)}`);
  }

  if (params.rangeStart) {
    queryParams.push(`rangeStart=${encodeURIComponent(params.rangeStart)}`);
  }

  if (params.rangeEnd) {
    queryParams.push(`rangeEnd=${encodeURIComponent(params.rangeEnd)}`);
  }

  if (queryParams.length > 0) {
    endpoint += `?${queryParams.join('&')}`;
  }

  return withServerError(() =>
    apiFetch<unknown, Res>(endpoint, {
      method: HTTP_VERB.GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-cache',
    })
  );
}
