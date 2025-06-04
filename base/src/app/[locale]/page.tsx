import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('greeting');

  return (
    <div className='flex flex-col items-center justify-center h-full m-auto'>
      <h1>{t('welcome')}</h1>
      <p>This is your new project, set up with the App Router and next-intl!</p>
      {/* TODO: Add a LocaleSwitcher component here later */}
    </div>
  );
} 