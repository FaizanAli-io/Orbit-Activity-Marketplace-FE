import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';
import { Preference } from '../get-profile';

export interface Vendor {
  id: number;
  email: string;
  name: string;
  phone?: string;
  rating: number;
}

export async function getVendors() {
  return withServerError(() =>
    apiFetch<unknown, Vendor[]>('/vendors', {
      method: HTTP_VERB.GET,
    })
  );
}
