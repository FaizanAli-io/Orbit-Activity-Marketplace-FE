'use server';

import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function deleteActivity(id: number) {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  return withServerError(async () => {
    const result = await apiFetch<undefined, { success: boolean }>(
      `/activities/${id}`,
      {
        method: HTTP_VERB.DELETE,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (result.success) {
      // Revalidate key pages in the background (less aggressive than before)
      revalidatePath('/profile/vendor/events', 'page');
      revalidatePath('/profile/events', 'page');
      revalidatePath('/explore', 'page');

      // Revalidate cache tags for activities
      revalidateTag('activities');
      revalidateTag(`activity-${id}`);
    }

    return result;
  });
}
