// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/lib/i18n/settings';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

// Regex pattern explanation:
// (?!api|_next|_vercel|monitoring|.*\\..*) - Negative lookahead to exclude:
// - api routes
// - _next (Next.js internals)
// - _vercel (Vercel internals)
// - monitoring (Sentry monitoring)
// - files with extensions (.*\\..*)
export const config = {
  matcher: [
    // Match all pathnames except those starting with:
    // - api (API routes)
    // - _next (Next.js internals)
    // - _vercel (Vercel internals)
    // - monitoring (Sentry monitoring)
    // - static files (e.g. favicon.ico, robots.txt)
    '/((?!api|_next|_vercel|monitoring|sentry-.*|.*\\..*).*)',
  ],
};
