'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import z from 'zod';

const schema = z.object({
  email: z.email(),
});

export async function requestToken(data: { email: string }) {
  try {
    const { success, error } = schema.safeParse(data);

    if (!success) return { success, error: error.message };

    await apiFetch<{ email: string }>('/auth/request-reset', {
      method: HTTP_VERB.POST,
      data,
    });

    return {
      success: true,
      data: null,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
