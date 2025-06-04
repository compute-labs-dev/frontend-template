'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { scale: 1, rotate: 0 },
  exit: { scale: 0, rotate: 180 },
};

const ThemeIcon = React.memo(({ isDark }: { isDark: boolean }) => (
  <AnimatePresence mode='wait' initial={false}>
    {!isDark ? (
      <motion.div
        key='sun'
        variants={iconVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        className='absolute inset-0 flex items-center justify-center rounded-full hover:border-2 hover:border-primary hover:text-primary'
      >
        <Sun className='h-5 w-5 hover:bg-primary' />
      </motion.div>
    ) : (
      <motion.div
        key='moon'
        variants={iconVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        className='absolute inset-0 flex items-center justify-center dark:text-white dark:hover:text-primary'
      >
        <Moon className='h-5 w-5' />
      </motion.div>
    )}
  </AnimatePresence>
));

ThemeIcon.displayName = 'ThemeIcon';

export const ThemeToggle = React.memo(() => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    // Return a placeholder with same dimensions to prevent layout shift
    return (
      <div className='flex h-12 w-12 items-center justify-center'>
        <div className='h-5 w-5' />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className='flex items-center space-x-2'>
      <Button
        variant='ghost'
        size='icon'
        className='relative h-12 w-12 hover:bg-background hover:font-bold'
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        <ThemeIcon isDark={isDark} />
      </Button>
      <Label htmlFor='theme-mode' className='sr-only'>
        Toggle theme
      </Label>
    </div>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
