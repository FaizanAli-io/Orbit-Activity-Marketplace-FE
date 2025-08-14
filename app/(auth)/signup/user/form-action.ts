'use server';

import { UserSchema } from './user-schema';
import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';
import type { z } from 'zod';

type User = z.infer<typeof UserSchema>;

interface SignupRequest extends Omit<User, 'confirmPassword'> {
  type: 'VENDOR' | 'USER';
}

export const signupUser = async (user: User) => {
  const result = UserSchema.safeParse(user);

  if (!result.success) {
    return {
      success: false,
      error: result.error.message, // more structured than .message
    };
  }

  const { confirmPassword: _, ...cleanedUser } = result.data;

  const payload: SignupRequest = {
    ...cleanedUser,
    type: 'USER',
  };

  return withServerError(
    async () =>
      await apiFetch<SignupRequest>('/auth/signup', {
        method: HTTP_VERB.POST,
        data: payload,
      })
  );
};
