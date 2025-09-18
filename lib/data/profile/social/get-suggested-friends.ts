import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { getProfile } from '../get-profile';
import { User } from '../users/get-users';

interface SuggestedFriendsResponse {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    total: number;
    hasNext: boolean;
  };
}

export async function getSuggestedFriends() {
  const token = await getAccessToken();
  const { success: isValidUser } = await getProfile();

  if (!token || !isValidUser)
    return { success: false, error: 'Unauthorized', data: undefined };

  return await withServerError(() =>
    apiFetch<unknown, SuggestedFriendsResponse>(`/social/friend-suggestions`, {
      method: HTTP_VERB.GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
}
