'use client';
import React from 'react';
import Link from 'next/link';
import LanguageSelector from '@/components/common/language-selector';
import { ThemeToggle } from '@/components/navbar/theme-toggle';
import LogoComponent from '@/components/common/logo';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Code2, Brain } from 'lucide-react';

function Header() {
  const t = useTranslations('header');
  const pathname = usePathname();

  const isAiDemoPage = pathname?.includes('/ai-demo');
  const isApiPage = pathname?.includes('/api');

  return (
      <header className='header relative z-50 w-full border-b border-gray-200 bg-background py-2 dark:border-gray-200'>
        <div className='pointer-events-none absolute inset-0 overflow-visible dark:hidden'>
          <div
            className='absolute inset-0 h-[150px] w-full dark:hidden md:h-[160px]'
            style={{
              top: 0,
              bottom: 'auto',
              maskImage: `linear-gradient(180deg, 
              rgba(0, 0, 0, 1) 0%, 
              rgba(0, 0, 0, 1) 30%, 
              rgba(0, 0, 0, 0.8) 50%, 
              rgba(0, 0, 0, 0.3) 80%, 
              rgba(0, 0, 0, 0) 100%
            )`,
              WebkitMaskImage: `linear-gradient(180deg, 
              rgba(0, 0, 0, 1) 0%, 
              rgba(0, 0, 0, 1) 30%, 
              rgba(0, 0, 0, 0.8) 50%, 
              rgba(0, 0, 0, 0.3) 80%, 
              rgba(0, 0, 0, 0) 100%
            )`,
            }}
          />
        </div>

        <div className='page-margin relative z-10 flex h-[50px] items-center justify-between md:h-[58px] lg:h-[70px]'>
          <div className='flex items-center gap-8'>
            <LogoComponent />
            
            {/* Navigation Links */}
            <nav className='hidden md:flex items-center gap-6'>
              <Link href='/' className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${!isAiDemoPage && !isApiPage ? 'text-primary' : 'text-muted-foreground'}`}>
                <Home className='h-4 w-4' />
                Home
              </Link>
              <Link href='/ai-demo' className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${isAiDemoPage ? 'text-primary' : 'text-muted-foreground'}`}>
                <MessageSquare className='h-4 w-4' />
                AI Chat Demo
              </Link>
              <Link href='/api/ai/chat' className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${isApiPage ? 'text-primary' : 'text-muted-foreground'}`}>
                <Code2 className='h-4 w-4' />
                API Docs
              </Link>
            </nav>
          </div>

          <div className='hidden items-center gap-4 md:flex'>
            {/* AI Status Indicator */}
            <div className='flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full'>
              <Brain className='h-4 w-4 text-primary animate-pulse' />
              <span className='text-xs font-medium text-primary'>AI Ready</span>
            </div>
            
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>
  );
}

export default Header;