'use server';

import { clearAccessToken } from '@/lib/cookies';
import { redirect } from 'next/navigation';

export async function logout() {
  await clearAccessToken();
  redirect('/login');
}
