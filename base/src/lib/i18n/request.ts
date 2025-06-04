import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || 'en'; // Default to 'en' if undefined
  return {
    messages: (await import(`./locales/${locale}.json`)).default,
    locale,
  };
});
