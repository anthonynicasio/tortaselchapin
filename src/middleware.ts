import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  defaultLocale,
  isValidLocale,
  LOCALE_COOKIE,
  type Locale,
} from '@/lib/locale';

function getPreferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isValidLocale(cookie)) return cookie;

  const acceptLanguage = request.headers.get('accept-language') || '';
  if (acceptLanguage.toLowerCase().startsWith('en')) return 'en';

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root redirect
  if (pathname === '/') {
    const locale = getPreferredLocale(request);
    const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
    response.cookies.set(LOCALE_COOKIE, locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }

  // Locale prefix validation
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, firstSegment, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }

  // Redirect unknown paths to default locale home
  if (!firstSegment || !isValidLocale(firstSegment)) {
    const locale = getPreferredLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)'],
};
