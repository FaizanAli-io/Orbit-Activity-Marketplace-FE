import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';

interface CalendarEvent {
  id: number;
  userId: number;
  activityId: number;
  startTime: string;
  endTime: string;
  timestamp: string;
  activity: {
    id: number;
    name: string;
    price: number;
    duration: string;
    location: string;
    vendorId: number;
    timestamp: string;
    categoryId: number;
    description: string;
  };
}

export async function getEvents() {
  const token = await getAccessToken();
  if (!token) return { success: false, error: 'Unauthorized', data: undefined };

  return withServerError(() =>
    apiFetch<unknown, CalendarEvent[]>('/calendar-events', {
      method: HTTP_VERB.GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-cache',
    })
  );
}
