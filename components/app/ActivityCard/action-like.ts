'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { revalidatePath } from 'next/cache';

export async function likeActivity(id: number) {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  return withServerError(async () => {
    const result = await apiFetch(`/activities/${id}/like`, {
      method: HTTP_VERB.POST,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath('/profile/dashboard');
    revalidatePath('/explore');

    return result;
  });
}

export async function unlikeActivity(id: number) {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  return withServerError(async () => {
    const result = await apiFetch(`/activities/${id}/unlike`, {
      method: HTTP_VERB.DELETE,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath('/profile/dashboard');
    revalidatePath('/explore');

    return result;
  });
}
