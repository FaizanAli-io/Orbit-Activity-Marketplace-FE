// lib/auth/cookies.ts
import { cookies } from 'next/headers';

const KEY = 'orbit_user';

export interface UserCookie {
  userId: string;
  type: 'VENDOR' | 'USER';
}

// Set token in secure, HttpOnly cookie
export async function setUser(user: UserCookie, options?: { maxAge?: number }) {
  const { set } = await cookies();
  set({
    name: KEY,
    value: JSON.stringify(user),
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: options?.maxAge ?? 60 * 60 * 24 * 7, // Default: 7 days
  });
}

// Get access token from cookie
export async function getUser(): Promise<UserCookie | null> {
  const { get } = await cookies();
  const user = get(KEY)?.value;

  if (!user) return null;
  return JSON.parse(user);
}

// Delete access token cookie (logout)
export async function clearUser() {
  const { delete: del } = await cookies();
  del(KEY);
}
