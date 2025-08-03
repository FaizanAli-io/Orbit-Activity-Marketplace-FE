'use server';
import { apiFetch } from '@/lib/api';
import { HTTP_VERB } from '@/lib/enums/http-verbs';
import { setAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { setUser, UserCookie } from '@/lib/utils/cookies/user-cookies';
import { withServerError } from '@/lib/utils/with-server-error';
import z from 'zod';

const schema = z.object({
  name: z.string(),
  email: z.email(),
  firebaseId: z.string(),
  type: z.enum(['USER', 'VENDOR']),
});

interface Res {
  accessToken: string;
  type: 'USER' | 'VENDOR';
  userId?: string;
  vendorId?: string;
}

type Data = z.infer<typeof schema>;

export async function signupWithFirebase(data: Data) {
  const res = await withServerError(() =>
    apiFetch<Data, Res>('/auth/signup', {
      method: HTTP_VERB.POST,
      data,
    })
  );

  if (!res.data) return res;

  const { accessToken, userId, vendorId, type } = res.data;
  await setAccessToken(accessToken);

  const id = userId || vendorId || '';

  const user: UserCookie = { userId: id, type };

  await setUser(user);

  return res;
}
