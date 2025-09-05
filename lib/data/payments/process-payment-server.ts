'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { getUser } from '@/lib/utils/cookies/user-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import {
  ProcessPaymentSchema,
  ProcessPaymentData,
} from '@/lib/schemas/payment-schemas';
import { PaymentRequest, PaymentResponse } from './types';
import { revalidatePath } from 'next/cache';

export async function processPaymentWithValidation(
  rawData: ProcessPaymentData
) {
  // Validate the input data on the server
  const validationResult = ProcessPaymentSchema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      success: false,
      data: undefined,
      error:
        'Invalid payment data: ' +
        validationResult.error.issues.map(issue => issue.message).join(', '),
    };
  }

  const validatedData = validationResult.data;

  const token = await getAccessToken();
  const user = await getUser();

  if (!token || !user) {
    return { success: false, data: undefined, error: 'Unauthorized' };
  }

  // Validate card number format (remove spaces for processing)
  const sanitizedCardNumber = validatedData.cardNumber.replace(/\s/g, '');
  if (sanitizedCardNumber.length !== 16) {
    return {
      success: false,
      data: undefined,
      error: 'Invalid card number format',
    };
  }

  // Validate expiry date (must be future date)
  const [month, year] = validatedData.expiryDate.split('/');
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
  const now = new Date();

  if (expiryDate < now) {
    return { success: false, data: undefined, error: 'Card has expired' };
  }

  const paymentData: PaymentRequest = {
    userId: parseInt(user.userId),
    vendorId: validatedData.vendorId,
    activityId: validatedData.activityId,
    amount: validatedData.amount,
    status: 'PENDING',
    method: validatedData.method,
  };

  return withServerError(async () => {
    // Create payment
    const paymentResult = await apiFetch<PaymentRequest, PaymentResponse>(
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

    // If payment is successful, subscribe to the activity
    if (paymentResult) {
      await apiFetch(`/activities/${validatedData.activityId}/subscribe`, {
        method: HTTP_VERB.POST,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Revalidate relevant paths
    revalidatePath('/profile/dashboard');
    revalidatePath('/profile/subscriptions');

    return paymentResult;
  });
}

// Legacy function for backward compatibility
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
