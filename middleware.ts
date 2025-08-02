import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './lib/utils/cookies/user-cookies';

// Define route patterns as regular expressions
const publicRoutes = [/^\/login$/, /^\/signup$/];
const protectedRoutes = [/^\/me\/profile(\/.*)?$/]; // matches /me/profile and anything nested
const vendorRoutes = [/^\/activity-form(\/.*)?$/];

function matchAny(path: string, patterns: RegExp[]) {
  return patterns.some(regex => regex.test(path));
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = matchAny(path, publicRoutes);
  const isProtectedRoute = matchAny(path, protectedRoutes);
  const isVendorRoute = matchAny(path, vendorRoutes);

  const token = await getAccessToken();
  const user = await getUser();

  if (isProtectedRoute && !token)
    return NextResponse.redirect(new URL('/login', req.nextUrl));

  if (isPublicRoute && token)
    return NextResponse.redirect(new URL('/me/profile', req.nextUrl));

  if (isVendorRoute) {
    if (!user)
      return NextResponse.redirect(new URL('/me/profile', req.nextUrl));

    if (!user.type || user.type !== 'VENDOR')
      return NextResponse.redirect(new URL('/me/profile', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|.*\\.(?:png|jpg|jpeg|svg|js|css|ico|woff2?|ttf)).*)'],
};
