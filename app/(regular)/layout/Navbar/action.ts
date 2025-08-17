'use server';

import { clearAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { clearUser } from '@/lib/utils/cookies/user-cookies';
import { redirect } from 'next/navigation';

export async function logout() {
  await clearAccessToken();
  await clearUser();

  redirect('/login');
}
