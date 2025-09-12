import { Activity } from './types';
import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { getProfile } from '../profile/get-profile';

interface params {
  page?: string;
  friendId: number;
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

export async function getGroupRecommendation(
  params: params = {
    friendId: 0,
  }
) {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  const { data: profile } = await getProfile();
  if (!profile || !profile?.user?.id)
    return { success: false, data: undefined, error: 'Unauthorized' };

  let endpoint = '/recommendation/group';
  if (params.page) endpoint += `?page=${encodeURIComponent(params.page)}`;

  return withServerError(() =>
    apiFetch<unknown, Res>(endpoint, {
      method: HTTP_VERB.POST,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userIds: [params.friendId, profile.user.id],
      },
      cache: 'force-cache',
    })
  );
}
