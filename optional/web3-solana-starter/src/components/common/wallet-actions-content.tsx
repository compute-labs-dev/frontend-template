import Image from 'next/image';
import React from 'react';
import { PopoverClose } from '../ui/popover';
import { ChevronRight, X, Copy, ExternalLink, LogOut } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { formatPublicKey } from '@/lib/utils';
import LayoutIcon from '@/assets/icons/LayoutIcon';
import Link from 'next/link';
import { AppWallets } from '@/lib/app-wallets';
import { useAppSelector } from '@/store';
import { toast } from 'sonner';

type Props = {
  close: () => void;
};

const WalletActionsContent = ({ close }: Props) => {
  const { publicKey, disconnect } = useWallet();
  const walletName = useAppSelector((state) => state.app.activeWalletName);

  if (!publicKey) return null;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(publicKey.toBase58());
      toast.success('Address copied to clipboard', {
        description: formatPublicKey(publicKey.toBase58()),
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to copy address', {
        description: 'Please try again',
        duration: 2000,
      });
    }
  };

  const openExplorer = () => {
    window.open(
      `https://explorer.solana.com/address/${publicKey.toBase58()}`,
      '_blank'
    );
  };

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800'>
        <div className='flex w-full items-center gap-3'>
          <Image
            src={
              AppWallets.find((w) => w.walletName === walletName)?.hoverImage ||
              AppWallets[0].hoverImage
            }
            alt='wallet'
            width={32}
            height={32}
            className='rounded-full'
          />
          <div className='flex w-full flex-col px-2'>
            <h2 className='text-sm font-medium text-gray-500 dark:text-gray-400'>
              Connected with {walletName || 'Wallet'}
            </h2>
            <div className='flex w-full flex-row items-center justify-between gap-2'>
              <p className='w-1/2 border-r border-gray-200 pr-4 text-lg font-semibold text-gray-900 dark:border-gray-800 dark:text-white'>
                {formatPublicKey(publicKey.toBase58())}
              </p>
            </div>
          </div>
        </div>
        <PopoverClose className='rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800'>
          <X className='h-5 w-5 text-gray-500 dark:text-gray-400' />
        </PopoverClose>
      </div>

      {/* Quick Actions */}
      <div className='mt-4 flex gap-2'>
        <button
          onClick={copyAddress}
          className='flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800/50'
        >
          <Copy className='h-4 w-4' />
          Copy Address
        </button>
        <button
          onClick={openExplorer}
          className='flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800/50'
        >
          <ExternalLink className='h-4 w-4' />
          View on Explorer
        </button>
      </div>

      {/* Main Actions */}
      <div className='mt-4 space-y-2'>
        
        <Link
          className='flex w-full items-center justify-between rounded-xl border border-gray-200 p-4 text-gray-400 dark:border-gray-800 dark:text-gray-600'
          href='/'
        >
          <div className='flex items-center gap-3'>
            <LayoutIcon className='h-6 w-6' />
            <span className='font-medium'>Dashboard</span>
          </div>
          <ChevronRight className='h-5 w-5' />
        </Link>

        <button
          onClick={disconnect}
          className='border-error/20 bg-error/5 hover:bg-error/10 dark:border-error-light/20 dark:bg-error/5 dark:hover:bg-error/10 flex w-full items-center justify-between rounded-xl border p-4 text-error transition-colors dark:text-error-light'
        >
          <div className='flex items-center gap-3'>
            <LogOut className='h-5 w-5' />
            <span className='font-medium'>Disconnect</span>
          </div>
          <ChevronRight className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
};

export default WalletActionsContent;
