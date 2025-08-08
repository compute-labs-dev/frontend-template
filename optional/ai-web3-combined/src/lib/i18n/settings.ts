// src/lib/i18n/settings.ts
export const locales = [
  'en',
  'zh',
  'de',
  'ja',
  'ko',
  'fil',
  'vi',
  'id',
] as const;
export const defaultLocale = 'en' as const;

export const languages = {
  en: 'English',
  zh: '中文',
  de: 'Deutsch',
  ja: '日本語',
  ko: '한국어',
  fil: 'Filipino',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
} as const;
