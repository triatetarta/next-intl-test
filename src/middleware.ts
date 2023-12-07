import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from './navigation';

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('x-default-locale') || 'en';

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
  });

  const response = handleI18nRouting(request);

  response.headers.set('x-default-locale', defaultLocale);
  return response;
}

export const config = {
  matcher: ['/', '/pathnames', '/about', '/(de|en)/:path*'],
};
