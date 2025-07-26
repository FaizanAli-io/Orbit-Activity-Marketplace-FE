'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { z } from 'zod';

const schema = z.object({
  newPassword: z.string(),
  token: z.string(),
});

type Request = z.infer<typeof schema>;

export async function resetPassword(data: Request) {
  try {
    const { success, error } = schema.safeParse(data);

    if (!success) return { success, error: error.message };

    const res = await apiFetch<Request>('/auth/request-reset', {
      method: HTTP_VERB.POST,
      data,
    });

    console.log(res);

    return {
      success: true,
      data: null,
    };
  } catch (err: any) {
    console.log(err);
    return { success: false, error: err.message };
  }
}
