import { Activity } from './types';
import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';

export async function getActivities() {
  return await withServerError(() =>
    apiFetch<unknown, Activity[]>('/activities', {
      method: HTTP_VERB.GET,
    })
  );
}

export async function getActivity(id: number) {
  return await withServerError(() =>
    apiFetch<unknown, Activity>(`/activities/${id}`, {
      method: HTTP_VERB.GET,
    })
  );
}
