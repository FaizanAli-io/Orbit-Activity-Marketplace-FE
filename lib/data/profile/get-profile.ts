import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { redirect } from 'next/navigation';

interface Preference {
  categoryId: number;
  category: string;

  subcategoryId: number;
  subcategory: string;
}

interface Profile {
  role: 'USER' | 'VENDOR';
  email: string;
  user: {
    id: number;
    name?: string;
    phone?: string;
    avatar?: string;
    preferences?: Preference[];
  };

  vendor?: {
    id: number;
    name: string;
    location?: string;
    description?: string;
    phone?: string;
    rating: number;
  };
}

export async function getProfile(navigate: boolean = true) {
  const token = await getAccessToken();

  if (!token) return { success: false, data: undefined, error: 'Unauthorized' };

  const result = await withServerError(() =>
    apiFetch<unknown, Profile>('/auth/me', {
      method: HTTP_VERB.GET,
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  if (result?.error?.includes('expired token') && navigate) {
    redirect('/logout');
  }

  return result;
}
