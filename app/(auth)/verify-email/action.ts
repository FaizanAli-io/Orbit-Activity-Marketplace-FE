'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';

export const verifyEmail = async (token: string) => {
  try {
    const res = await apiFetch<{ token: string }, unknown>(
      '/auth/verify-email',
      {
        method: HTTP_VERB.POST,
        data: { token },
      }
    );

    return { success: true, data: res };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};
