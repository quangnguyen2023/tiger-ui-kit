import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const authRoutes = ['/sign-in', '/sign-up'];
  const protectedRoutes = ['/widget-customizer'];

  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (token) {
    if (isAuthRoute) {
      return NextResponse.redirect(
        new URL('/widget-customizer/my-widgets', req.url)
      );
    }
  } else {
    if (isProtectedRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/widget-customizer/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
