'use server';

import { apiFetch } from '@/lib/api';
import { ActivityFormSchema as Data } from './../schema';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';

export type Body = {
  name: string;
  description: string;
  categoryId: number;
  price: number;
  capacity: number;
  location: string;
  duration: string;
  quota: number;
  discount: number;

  availability: {
    type: string;

    dates?: {
      date: Date;
      time?: {
        start: string;
        end: string;
      };
    }[];

    range?: {
      date: {
        start: Date;
        end: Date;
      };
      time?: {
        start: string;
        end: string;
      };
    };
    weekly?: {
      days: number[];
      date: {
        start: Date;
        end: Date;
      };
      time?: {
        start: string;
        end: string;
      };
    };
    monthly?: {
      days: number[];
      date: {
        start: Date;
        end: Date;
      };
      time?: {
        start: string;
        end: string;
      };
    };
    exclusions: Date[];
  };
  images: {
    video?: string;
    thumbnail: string;
    images: string[];
  };
};

export async function postActivity(data: Body) {
  const authToken = await getAccessToken();

  if (!authToken) return { success: false, error: 'Unauthorized', data: null };

  return await withServerError(() =>
    apiFetch<Body, Data & { id: number }>('/activities', {
      method: HTTP_VERB.POST,
      data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  );
}
