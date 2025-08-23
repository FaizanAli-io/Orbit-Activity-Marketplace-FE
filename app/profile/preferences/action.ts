'use server';

import z from 'zod';
import { schema } from './schema';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';

type Data = z.infer<typeof schema>;

interface Req {
  name?: string;
  phone?: string;
  preferences?: number[];
  avatar?: string;
}

export async function updateUser(data: Data) {
  const { success, error } = schema.safeParse(data);

  if (!success) return { success, data: undefined, error: error.message };

  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  const { email, preferences, ...body } = data;

  return withServerError(() =>
    apiFetch<Req, unknown>('/users', {
      method: HTTP_VERB.PATCH,
      data: {
        ...body,
        preferences: preferences.map(Number),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
}
