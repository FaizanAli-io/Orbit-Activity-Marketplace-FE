'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import {
  clearAccessToken,
  getAccessToken,
} from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { redirect } from 'next/navigation';

export async function deleteAccount() {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  return withServerError(async () => {
    const result = await apiFetch<unknown, { error: string; success: boolean }>(
      `/users`,
      {
        method: HTTP_VERB.DELETE,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // if (result.success) {
    //   await clearAccessToken();
    //   await redirect('/login');

    //   return { success: true, error: undefined };
    // }

    return result;
  });
}
