import { Activity } from './types';
import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { getUser } from '@/lib/utils/cookies/user-cookies';
import { withServerError } from '@/lib/utils/with-server-error';

interface params {
  name?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
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

export async function getLikedActivities() {
  const token = await getAccessToken();
  const user = await getUser();

  if (!token || !user)
    return { success: false, error: 'Unauthorized', data: undefined };

  return await withServerError(() =>
    apiFetch<unknown, Res>(`/users/liked`, {
      method: HTTP_VERB.GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-cache',
    })
  );
}
