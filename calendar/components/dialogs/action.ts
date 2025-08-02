'use server';

import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const schema = z.object({
  activityId: z.number().positive(),
  startTime: z.string(),
  endTime: z.string(),
});

type Req = z.infer<typeof schema>;

export async function postEvent(data: Req) {
  const { success, error } = schema.safeParse(data);
  if (!success) return { success, error: error.message, data: null };

  const token = await getAccessToken();
  if (!token) return { success: false, error: 'Unauthorized', data: null };

  const result = await withServerError(() =>
    apiFetch<Req, unknown>('/calendar-events', {
      method: HTTP_VERB.POST,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  if (result.success) revalidatePath('/calendar');

  return result;
}

export async function deleteEvent(id: number) {
  const token = await getAccessToken();
  if (!token) return { success: false, error: 'Unauthorized', data: null };

  const result = await withServerError(() =>
    apiFetch<unknown, unknown>(`/calendar-events/${id}`, {
      method: HTTP_VERB.DELETE,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  if (result.success) revalidatePath('/calendar');

  return result;
}
