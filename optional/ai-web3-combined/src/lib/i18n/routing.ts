// src/lib/i18n/routing.ts
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from './settings'; // Assuming defaultLocale is not strictly needed here by createSharedPathnamesNavigation

// Pathnames can be defined for type-safe linking if desired, but are not passed to createSharedPathnamesNavigation directly.
export const pathnames = {
  '/': '/',
  '/assets': '/assets',
  '/yield': '/yield',
  '/transactions': '/transactions',
  '/staking': '/staking',
  '/support': '/support',
} as const;

// This should match your middleware configuration.
const localePrefix = 'as-needed';

export const { Link, redirect, usePathname, useRouter } = // Removed getPathname
  createSharedPathnamesNavigation({ locales, localePrefix }); // Removed pathnames from config

export type Pathnames = keyof typeof pathnames;
export type Locale = (typeof locales)[number];
