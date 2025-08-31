'use server';

import { apiFetch } from '@/lib/api';
import { ActivityFormSchema as Data } from '../schema';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import { revalidatePath } from 'next/cache';
import { getProfile } from '@/lib/data/profile/get-profile';

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

export async function updateActivity(data: Body, id: number) {
  const authToken = await getAccessToken();
  const { data: user } = await getProfile();

  if (!authToken || !user || user.role !== 'VENDOR')
    return { success: false, error: 'Unauthorized', data: null };

  const res = await withServerError(() =>
    apiFetch<Body, Data & { id: number }>(`/activities/${id}`, {
      method: HTTP_VERB.PATCH,
      data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
  );

  if (res.success) {
    revalidatePath('/profile/vendor/activities');
  }

  return res;
}
