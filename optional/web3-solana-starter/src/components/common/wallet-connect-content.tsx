// /components/common/wallet-connect-content.tsx
import { AppWallets } from '@/lib/app-wallets';
import React, { useEffect, useState } from 'react';
import { PopoverClose } from '../ui/popover';
import { ChevronRight, X } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { DialogClose } from '../ui/dialog';
import { useAppDispatch } from '@/store';
import { setActiveWalletName } from '@/store/reducers/app-reducer';
import { cn } from '@/lib/utils';

type Props = {
  isDialog?: boolean;
};

const WalletConnectContent = ({ isDialog }: Props) => {
  const { wallets, select, connecting, connected } = useWallet();
  const dispatch = useAppDispatch();
  const [selectedWallet, setSelectedWallet] = useState('');

  const isWalletDetected = (walletName: string) => {
    const target = wallets.find((w) => w.adapter.name === walletName);
    return target?.readyState === 'Installed';
  };

  const onSelect = (walletName: string) => {
    const target = wallets.find((w) => w.adapter.name === walletName);
    setSelectedWallet(walletName);
    dispatch(setActiveWalletName(walletName));

    if (target && target.readyState === 'Installed') {
      setTimeout(() => {
        select(target.adapter.name);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!connecting || connected) {
      setSelectedWallet('');
    }
  }, [connecting, connected]);

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
          Connect a wallet
        </h2>
        {isDialog ? (
          <DialogClose className='rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800'>
            <X className='h-5 w-5 text-gray-500 dark:text-gray-400' />
          </DialogClose>
        ) : (
          <PopoverClose className='rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800'>
            <X className='h-5 w-5 text-gray-500 dark:text-gray-400' />
          </PopoverClose>
        )}
      </div>

      <div className='mt-4 space-y-2'>
        {AppWallets.map((wallet) => {
          const isDetected = isWalletDetected(wallet.walletName);
          const isSelected = wallet.walletName === selectedWallet;

          return (
            <button
              key={wallet.name}
              onClick={() => onSelect(wallet.walletName)}
              disabled={!isDetected}
              className={cn(
                'group relative w-full rounded-xl border p-4 transition-all duration-200',
                'hover:border-primary/50 hover:bg-primary/5 dark:hover:border-primary-dark/50 dark:hover:bg-primary-dark/5',
                isDetected
                  ? 'border-gray-200 dark:border-gray-800'
                  : 'cursor-not-allowed border-gray-100 bg-gray-50 opacity-60 dark:border-gray-800 dark:bg-gray-900',
                isSelected &&
                  'border-primary bg-primary/5 dark:border-primary-dark dark:bg-primary-dark/5'
              )}
            >
              <div className='flex items-center gap-4'>
                {/* Wallet Icon */}
                <div className='relative h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                  <Image
                    src={isSelected ? wallet.hoverImage : wallet.image}
                    alt={wallet.name}
                    className='h-full w-full object-cover transition-opacity'
                    width={40}
                    height={40}
                  />
                </div>

                {/* Wallet Info */}
                <div className='flex flex-1 items-center justify-between'>
                  <div className='space-y-1 text-left'>
                    <p
                      className={cn(
                        'font-medium',
                        isSelected
                          ? 'text-primary dark:text-primary-light'
                          : 'text-gray-900 dark:text-white'
                      )}
                    >
                      {wallet.name}
                    </p>
                    <p
                      className={cn(
                        'text-sm',
                        isDetected
                          ? 'text-gray-600 dark:text-gray-400'
                          : 'text-error dark:text-error-light'
                      )}
                    >
                      {isDetected ? 'Detected' : 'Not Detected'}
                    </p>
                  </div>

                  <ChevronRight
                    className={cn(
                      'h-5 w-5 transition-colors',
                      isSelected
                        ? 'text-primary dark:text-primary-light'
                        : 'text-gray-400 dark:text-gray-600'
                    )}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Help Text */}
      <p className='mt-6 text-center text-sm text-gray-500 dark:text-gray-400'>
        New to Solana?{' '}
        <a
          href='https://solana.com/ecosystem/explore?categories=wallet'
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary hover:text-primary/80 dark:text-primary-light dark:hover:text-primary-light/80'
        >
          Learn more about wallets
        </a>
      </p>
    </div>
  );
};

export default WalletConnectContent;
