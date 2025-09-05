import { Activity } from './types';
import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';

interface params {
  name?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
  vendorId?: string;
  limit?: number;
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

export async function getActivities(params: params = {}) {
  let endpoint = '/activities';

  const query: string[] = [];

  if (params.name) query.push(`name=${encodeURIComponent(params.name)}`);

  if (params.categoryId)
    query.push(`categoryId=${encodeURIComponent(params.categoryId)}`);

  if (params.minPrice)
    query.push(`minPrice=${encodeURIComponent(params.minPrice)}`);

  if (params.maxPrice)
    query.push(`maxPrice=${encodeURIComponent(params.maxPrice)}`);

  if (params.page) query.push(`page=${encodeURIComponent(params.page)}`);

  if (params.vendorId)
    query.push(`vendorId=${encodeURIComponent(params.vendorId)}`);

  if (params.limit) query.push(`limit=${encodeURIComponent(params.limit)}`);

  if (query.length > 0) endpoint += `?${query.join('&')}`;

  return withServerError(() =>
    apiFetch<unknown, Res>(endpoint, {
      method: HTTP_VERB.GET,
    })
  );
}
export async function getActivity(id: number) {
  return await withServerError(() =>
    apiFetch<unknown, Activity>(`/activities/${id}`, {
      method: HTTP_VERB.GET,
      cache: 'force-cache',
    })
  );
}
