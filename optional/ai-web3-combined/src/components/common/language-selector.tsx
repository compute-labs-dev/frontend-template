// components/common/LanguageSelector.tsx
'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { Language, setLanguage } from '@/store/reducers/language-reducer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Globe } from 'lucide-react';
import { useRouter, usePathname } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import React, { Suspense, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const languages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'fil', name: 'Filipino' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'id', name: 'Bahasa Indonesia' },
];

// Move language options outside component to prevent recreation
const LANGUAGE_OPTIONS = languages.map((lang) => ({ ...lang, enabled: true }));

const LanguageSelectorContent = () => {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(
    (state) => state.language.currentLanguage
  );
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('header.language');

  // Memoize any language filtering or processing
  const availableLanguages = React.useMemo(
    () => LANGUAGE_OPTIONS.filter((lang) => lang.enabled),
    []
  );

  // Sync URL locale with Redux state on mount
  useEffect(() => {
    const urlLocale = window.location.pathname.split('/')[1];
    if (
      urlLocale &&
      languages.some((lang) => lang.code === urlLocale) &&
      urlLocale !== currentLanguage
    ) {
      dispatch(setLanguage(urlLocale as Language));
    }
  }, [dispatch, currentLanguage]);

  const handleLanguageChange = async (lang: Language) => {
    // First update Redux state and localStorage
    dispatch(setLanguage(lang));

    // Then update the URL
    try {
      await router.replace(pathname, { locale: lang });
    } catch (error) {
      console.error('Failed to update URL locale:', error);
      // Revert Redux state if URL update fails
      dispatch(setLanguage(currentLanguage));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className='group relative rounded-full hover:font-bold hover:text-primary hover:ring-2 hover:ring-primary/90 hover:ring-offset-2'
          aria-label='Select language'
          variant='ghost'
          size='icon'
        >
          <Globe className='h-7 w-7 text-gray-600 transition-colors group-hover:text-primary dark:text-gray-100 dark:text-white dark:group-hover:text-primary' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='max-h-[300px] w-48 border border-gray-200 bg-white/80 p-2 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/90'
        align='end'
      >
        <div className='space-y-2'>
          <div className='mb-1 border-b border-gray-200 px-2 pb-1.5 dark:border-gray-800'>
            <h3 className='text-center text-sm font-medium text-gray-700 dark:text-gray-300'>
              {t('selectLanguage')}
            </h3>
          </div>
          <motion.div
            className='scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 flex max-h-[220px] flex-col space-y-1 overflow-y-auto'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {availableLanguages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-all ${
                  currentLanguage === lang.code
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                } `}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {currentLanguage === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className='mr-2 h-2 w-2 rounded-full bg-primary'
                  />
                )}
                <span className='flex-1'>{t(lang.code)}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const LanguageSelector = () => {
  return (
    <Suspense
      fallback={
        <Button
          variant='ghost'
          size='icon'
          className='relative h-12 w-12 rounded-full'
        >
          {/* <Globe className='h-12 w-12 ' /> */}
        </Button>
      }
    >
      <LanguageSelectorContent />
    </Suspense>
  );
};

export default LanguageSelector;
