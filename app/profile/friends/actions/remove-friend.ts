import { apiFetch } from '@/lib/api';
import { getProfile } from '@/lib/data/profile/get-profile';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { revalidatePath } from 'next/cache';

export async function removeFriend(id: number) {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  const { success: isValidUser } = await getProfile();
  if (!isValidUser)
    return { success: false, data: undefined, error: 'Unauthorized' };

  return withServerError(async () => {
    const result = await apiFetch(`/social/friends/${id}`, {
      method: HTTP_VERB.DELETE,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath('/profile/friends');

    return result;
  });
}
