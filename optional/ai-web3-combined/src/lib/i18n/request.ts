import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const requestedLocale = (await locale) || 'en';
  return {
    messages: (await import(`./locales/${requestedLocale}.json`)).default,
  };
});
