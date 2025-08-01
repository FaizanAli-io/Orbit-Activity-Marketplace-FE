import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { useQuery } from '@tanstack/react-query';

interface Category {
  id: number;
  name: string;
  subcategories: [
    {
      id: number;
      name: string;
    }
  ];
}

export const useCategories = () =>
  useQuery({
    queryFn: async () =>
      apiFetch<unknown, Category[]>('/categories', {
        method: HTTP_VERB.GET,
      }),
    queryKey: ['categories'],
  });
