// lib/auth/cookies.ts
import { cookies } from 'next/headers';

const ACCESS_TOKEN_KEY = 'access_token';

// Set token in secure, HttpOnly cookie
export async function setAccessToken(
  token: string,
  options?: { maxAge?: number }
) {
  const { set } = await cookies();
  set({
    name: ACCESS_TOKEN_KEY,
    value: token,
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: options?.maxAge ?? 60 * 60 * 24 * 7, // Default: 7 days
  });
}

// Get access token from cookie
export async function getAccessToken(): Promise<string | null> {
  const { get } = await cookies();
  const token = get(ACCESS_TOKEN_KEY)?.value;
  return token ?? null;
}

// Delete access token cookie (logout)
export async function clearAccessToken() {
  const { delete: del } = await cookies();
  del(ACCESS_TOKEN_KEY);
}
