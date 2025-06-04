import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from './lib/i18n/settings'; // Import locales from your settings file

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is a supported locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (await import(`../../messages/${locale}.json`)).default // Adjusted path to messages
  };
}); 