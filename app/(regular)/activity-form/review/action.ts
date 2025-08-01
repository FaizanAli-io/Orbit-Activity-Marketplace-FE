'use server';

import { apiFetch } from '@/lib/api';
import { ActivityFormSchema as Data } from './../schema';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/lib/utils/cookies/user-cookies';

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
  const user = await getUser();

  if (!authToken || !user || user.type !== 'VENDOR')
    return { success: false, error: 'Unauthorized', data: null };

  const res = await withServerError(() =>
    apiFetch<Body, Data & { id: number }>('/activities', {
      method: HTTP_VERB.POST,
      data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  );

  if (res.success) {
    revalidatePath('/explore');
  }

  return res;
}
