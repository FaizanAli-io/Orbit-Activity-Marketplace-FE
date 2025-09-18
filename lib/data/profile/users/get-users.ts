import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';
import { getProfile, Preference } from '../get-profile';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  preferences: Preference[];
}

interface Response {
  data: User[] | undefined;
  pagination: {
    page: number;
    total: number;
    totalPages: number;
    limit: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
}

export async function getUsers(searchQuery?: string) {
  const token = await getAccessToken();
  const { success: isValidUser } = await getProfile();

  if (!token || !isValidUser)
    return { success: false, error: 'Unauthorized', data: undefined };

  const searchParam = searchQuery
    ? `?search=${encodeURIComponent(searchQuery)}`
    : '';

  return withServerError(() =>
    apiFetch<unknown, Response>(`/users${searchParam}`, {
      method: HTTP_VERB.GET,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
}
