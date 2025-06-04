'use client';
import React, { useState } from 'react';
import LanguageSelector from '@/components/common/language-selector';
import { ThemeToggle } from '@/components/navbar/theme-toggle';
import LogoComponent from '@/components/common/logo';
import WalletPopover from '@/components/common/wallet-popover';
import { Button } from '@/components/ui/button';
import { useWallet } from '@solana/wallet-adapter-react';
import { formatPublicKey } from '@/lib/utils';
import { useTranslations } from 'next-intl';

function Header() {
  const { publicKey } = useWallet();
  const t = useTranslations('header');
  const [popoverOpen, setPopoverOpen] = useState(false);

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
          <LogoComponent />

          <div className='hidden items-center gap-4 md:flex'>
            <LanguageSelector />
            <ThemeToggle />
            <WalletPopover open={popoverOpen} setOpen={setPopoverOpen}>
              <Button
                className='pointer-events-none h-8 px-3.5 text-[11px] opacity-0 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 md:pointer-events-auto md:text-[16px] md:opacity-100 lg:text-[16px] xl:h-11'
                onClick={() => setPopoverOpen(true)}
              >
                {publicKey
                  ? formatPublicKey(publicKey?.toBase58())
                  : t('connectWallet')}
              </Button>
            </WalletPopover>
          </div>
        </div>
      </header>
  );
}

export default Header;