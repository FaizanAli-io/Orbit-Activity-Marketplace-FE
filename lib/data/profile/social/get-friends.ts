import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { getProfile } from '../get-profile';
import { User } from '../users/get-users';

export async function getFriends() {
  const token = await getAccessToken();
  const { success: isValidUser } = await getProfile();

  if (!token || !isValidUser)
    return { success: false, error: 'Unauthorized', data: undefined };

  return await withServerError(() =>
    apiFetch<unknown, User[]>(`/social/friends`, {
      method: HTTP_VERB.GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-cache',
    })
  );
}
