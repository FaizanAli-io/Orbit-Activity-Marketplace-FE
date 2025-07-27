import { getAccessToken } from '@/lib/utils/cookies/auth-cookies';
import { NextRequest, NextResponse } from 'next/server';

// Define route patterns as regular expressions
const publicRoutes = [/^\/login$/, /^\/signup$/];
const protectedRoutes = [/^\/me\/profile(\/.*)?$/]; // matches /me/profile and anything nested

function matchAny(path: string, patterns: RegExp[]) {
  return patterns.some(regex => regex.test(path));
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = matchAny(path, publicRoutes);
  const isProtectedRoute = matchAny(path, protectedRoutes);

  const token = await getAccessToken();

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/me/profile', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Match all paths except:
      - _next (Next.js internals)
      - static files like .png, .jpg, .js, etc.
      - API routes (optional)
    */
    '/((?!_next/|api/|.*\\.(?:png|jpg|jpeg|svg|js|css|ico|woff2?|ttf)).*)',
  ],
};
