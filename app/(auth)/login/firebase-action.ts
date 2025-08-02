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
  type: z.enum(['USER', 'VENDOR']).optional(),
});

interface Res {
  accessToken: string;
  type: 'VENDOR' | 'USER';
  userId?: string;
  vendorId?: string;
}

interface LoginReq {
  email: string;
  firebaseId: string;
}

type Data = z.infer<typeof schema>;

export async function authWithFirebase(data: Data) {
  const { success, error } = schema.safeParse(data);
  if (!success) return { success, error: error.message, data: undefined };

  const res = await withServerError(() =>
    apiFetch<Data, Res>('/auth/signup', {
      method: HTTP_VERB.POST,
      data,
    })
  );

  if (res.success) {
    await createCookies(res.data);
    return res;
  } else {
    const loginRes = await handleFirebaseLogin({
      email: data.email,
      firebaseId: data.firebaseId,
    });
    return loginRes;
  }
}

async function handleFirebaseLogin(data: LoginReq) {
  const res = await withServerError(() =>
    apiFetch<LoginReq, Res>('/auth/login', {
      method: HTTP_VERB.POST,
      data,
    })
  );

  if (!res.success) return res;

  await createCookies(res.data);

  return res;
}

async function createCookies(data: Res) {
  const { accessToken, userId, vendorId, type } = data;
  await setAccessToken(accessToken);
  const id = userId || vendorId || '';
  const user: UserCookie = { userId: id, type };
  await setUser(user);
}
