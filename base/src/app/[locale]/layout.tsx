import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/settings';
import LayoutWrapper from '@/app/layout-wrapper';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!(locales as readonly string[]).includes(locale)) notFound();

  let messages;
  try {
    messages = (await import(`@/lib/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </NextIntlClientProvider>
  );
}
