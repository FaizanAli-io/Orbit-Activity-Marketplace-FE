import { getAccessToken } from '@/lib/cookies';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/signup'];
const protectedRoutes = ['/me/profile', '/me/profile/friends'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);

  const token = await getAccessToken();
  if (isProtectedRoute && !token)
    return NextResponse.redirect(new URL('/login', req.nextUrl));

  if (isPublicRoute && token)
    return NextResponse.redirect(new URL('/me/profile', req.nextUrl));

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
