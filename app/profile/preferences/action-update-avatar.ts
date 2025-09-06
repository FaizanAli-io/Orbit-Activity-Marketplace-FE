'use server';

import z from 'zod';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';

type Req = { avatar: string };

export async function updateAvatar({ avatar }: Req) {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  return withServerError(() =>
    apiFetch<Req, unknown>('/users', {
      method: HTTP_VERB.PATCH,
      data: {
        avatar,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
}
