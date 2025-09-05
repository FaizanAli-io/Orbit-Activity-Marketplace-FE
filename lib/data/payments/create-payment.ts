'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { getUser } from '@/lib/utils/cookies/user-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { PaymentRequest, PaymentResponse } from './types';
import { revalidatePath } from 'next/cache';

export async function createPayment(
  activityId: number,
  vendorId: number,
  amount: number,
  method: PaymentRequest['method'] = 'CREDIT_CARD'
) {
  const token = await getAccessToken();
  const user = await getUser();

  if (!token || !user) {
    return { success: false, data: undefined, error: 'Unauthorized' };
  }

  const paymentData: PaymentRequest = {
    userId: parseInt(user.userId),
    vendorId,
    activityId,
    amount,
    status: 'PENDING',
    method,
  };

  return withServerError(async () => {
    const result = await apiFetch<PaymentRequest, PaymentResponse>(
      '/payments',
      {
        method: HTTP_VERB.POST,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: paymentData,
      }
    );

    // Revalidate relevant paths
    revalidatePath('/profile/dashboard');
    revalidatePath('/profile/subscriptions');

    return result;
  });
}

export async function processSubscriptionWithPayment(
  activityId: number,
  vendorId: number,
  amount: number
) {
  const token = await getAccessToken();
  if (!token) {
    return { success: false, data: undefined, error: 'Unauthorized' };
  }

  // First create the payment
  const paymentResult = await createPayment(activityId, vendorId, amount);

  if (!paymentResult.success) {
    return paymentResult;
  }

  // If payment is successful, subscribe to the activity
  return withServerError(async () => {
    const result = await apiFetch(`/activities/${activityId}/subscribe`, {
      method: HTTP_VERB.POST,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath('/profile/dashboard');
    return result;
  });
}
