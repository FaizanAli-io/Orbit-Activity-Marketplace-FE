'use server';

import { UserSchema } from './user-schema';
import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import type { z } from 'zod';

type User = z.infer<typeof UserSchema>;

interface SignupRequest extends Omit<User, 'confirmPassword'> {
  role: 'VENDOR' | 'USER';
}

export const signupUser = async (user: User) => {
  const result = UserSchema.safeParse(user);

  if (!result.success) {
    return {
      success: false,
      error: result.error.message, // more structured than .message
    };
  }

  const { confirmPassword, ...cleanedUser } = result.data;

  const payload: SignupRequest = {
    ...cleanedUser,
    role: 'USER',
  };

  try {
    const response = await apiFetch<SignupRequest>('/auth/signup', {
      method: HTTP_VERB.POST,
      data: payload,
    });

    console.log(response);

    return {
      success: true,
      data: response,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: message };
  }
};
