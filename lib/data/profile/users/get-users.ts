import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';
import { Preference } from '../get-profile';

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  preferences: Preference[];
}

export async function getUsers() {
  return withServerError(() =>
    apiFetch<unknown, User[]>('/users', {
      method: HTTP_VERB.GET,
    })
  );
}
