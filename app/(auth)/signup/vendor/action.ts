'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';
import type { z } from 'zod';
import { VendorSchema } from './vendor-schema';

type Vendor = z.infer<typeof VendorSchema>;

interface SignupRequest extends Omit<Vendor, 'confirmPassword'> {
  type: 'VENDOR' | 'USER';
}

export const signupVendor = async (vendor: Vendor) => {
  const result = VendorSchema.safeParse(vendor);

  if (!result.success) {
    return {
      success: false,
      error: result.error.message,
    };
  }

  const { confirmPassword: _, ...cleanedUser } = result.data;

  const payload: SignupRequest = {
    ...cleanedUser,
    type: 'VENDOR',
  };

  return withServerError(async () => {
    await apiFetch<SignupRequest>('/auth/signup', {
      method: HTTP_VERB.POST,
      data: payload,
    });

    return null;
  });
};
