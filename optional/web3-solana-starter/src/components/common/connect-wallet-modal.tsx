import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '../ui/dialog';
import WalletConnectContent from './wallet-connect-content';

const ConnectWalletModal = () => {
  return (
    <Dialog>
      <DialogTrigger className='w-full rounded-[10px] border-2 border-gray-compute bg-gray-button py-3 text-xl font-semibold text-gray-compute transition-all hover:opacity-90 hover:shadow-md hover:shadow-black/30'>
        Connect Wallet
      </DialogTrigger>
      <DialogContent className='max-w-[526px]'>
        <DialogTitle className='hidden'>Connect Wallet</DialogTitle>
        <WalletConnectContent isDialog />
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWalletModal;
