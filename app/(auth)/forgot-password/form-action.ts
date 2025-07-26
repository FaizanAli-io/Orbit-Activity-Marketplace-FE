'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';
import z from 'zod';

const schema = z.object({
  email: z.email(),
});

export async function requestToken(data: { email: string }) {
  const { success, error } = schema.safeParse(data);

  if (!success) return { success, error: error.message };

  return withServerError(async () => {
    await apiFetch<{ email: string }>('/auth/request-reset', {
      method: HTTP_VERB.POST,
      data,
    });
    return null;
  });
}
