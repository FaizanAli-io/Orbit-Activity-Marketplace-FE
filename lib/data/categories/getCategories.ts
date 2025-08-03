import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { withServerError } from '@/lib/utils/with-server-error';

interface Category {
  id: number;
  name: string;
  subcategories: {
    id: number;
    name: string;
  }[];
}

export async function getCategories() {
  return withServerError(() =>
    apiFetch<unknown, Category[]>('/categories', {
      method: HTTP_VERB.GET,
    })
  );
}
