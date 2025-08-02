import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';

interface Profile {
  role: 'USER' | 'VENDOR';
  email: string;
  user: {
    id: number;
    name?: string;
    phone?: string;
    avatar?: string;
    preferences?: [];
  };
}

export async function getProfile() {
  const token = await getAccessToken();
  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  return withServerError(() =>
    apiFetch<unknown, Profile>('/auth/me', {
      method: HTTP_VERB.GET,
      headers: { Authorization: `Bearer ${token}` },
    })
  );
}
