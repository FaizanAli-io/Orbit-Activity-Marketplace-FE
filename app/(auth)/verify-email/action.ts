'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';

export const verifyEmail = async (token: string) => {
  return withServerError(async () => {
    await apiFetch<{ token: string }, unknown>('/auth/verify-email', {
      method: HTTP_VERB.POST,
      data: { token },
    });
    return null;
  });
};
