import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';

export interface Attendee {
  id: number;
  name?: string;
  phone?: string;
  avatar?: string;
  preferences?: number[];
}

export async function getAttendees(id: number) {
  return withServerError(() =>
    apiFetch<unknown, Attendee[]>(`/activities/${id}/subscriptions`, {
      method: HTTP_VERB.GET,
    })
  );
}
