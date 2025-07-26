'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';
import { z } from 'zod';

const schema = z.object({
  newPassword: z.string(),
  token: z.string(),
});

type Request = z.infer<typeof schema>;

export async function resetPassword(data: Request) {
  const { success, error } = schema.safeParse(data);

  if (!success) return { success, error: error.message };

  return withServerError(async () => {
    await apiFetch<Request>('/auth/reset-password', {
      method: HTTP_VERB.POST,
      data,
    });

    return null;
  });
}
