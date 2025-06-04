// /components/common/wallet-popover.tsx
'use client';

import React, { PropsWithChildren } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletConnectContent from './wallet-connect-content';
import WalletActionsContent from './wallet-actions-content';
import { cn } from '@/lib/utils';

interface Props extends PropsWithChildren {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const WalletPopover = ({ children, open, setOpen }: Props) => {
  const { publicKey, connected } = useWallet();
  const isConnected = !!connected && Boolean(publicKey);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          align='end'
          side='bottom'
          className={cn(
            'w-screen max-w-[400px] transform overflow-hidden rounded-xl border border-gray-200/50 bg-white p-0 shadow-lg backdrop-blur-xl transition-all dark:border-gray-800 dark:bg-gray-900/95 dark:shadow-2xl sm:max-w-[450px]',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
          )}
        >
          <div className='relative'>
            {/* Gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary-dark/10' />

            {/* Content */}
            <div className='relative z-10'>
              {isConnected ? (
                <WalletActionsContent
                  close={() => setOpen(false)}
                />
              ) : (
                <WalletConnectContent />
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default WalletPopover;
