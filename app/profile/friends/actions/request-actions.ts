'use server';

import { apiFetch } from '@/lib/api';
import { getProfile } from '@/lib/data/profile/get-profile';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { revalidatePath } from 'next/cache';

export async function sendFriendReq(id: number) {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  const { success: isValidUser } = await getProfile();
  if (!isValidUser)
    return { success: false, data: undefined, error: 'Unauthorized' };

  return withServerError(async () => {
    const result = await apiFetch(`/social/friend-requests/${id}`, {
      method: HTTP_VERB.POST,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath('/profile/friends');

    return result;
  });
}

export async function declineFriendReq(id: number) {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  const { success: isValidUser } = await getProfile();
  if (!isValidUser)
    return { success: false, data: undefined, error: 'Unauthorized' };

  return withServerError(async () => {
    const result = await apiFetch(`/social/friend-requests/${id}/decline`, {
      method: HTTP_VERB.POST,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath('/profile/friends');

    return result;
  });
}

export async function acceptFriendReq(id: number) {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  const { success: isValidUser } = await getProfile();
  if (!isValidUser)
    return { success: false, data: undefined, error: 'Unauthorized' };

  return withServerError(async () => {
    const result = await apiFetch(`/social/friend-requests/${id}/accept`, {
      method: HTTP_VERB.POST,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath('/profile/friends');

    return result;
  });
}
