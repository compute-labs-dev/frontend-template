'use client';

import { type PropsWithChildren, useRef } from 'react';
import {
  LedgerWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { Connection, Keypair } from '@solana/web3.js';
import { AnchorProvider } from '@coral-xyz/anchor';

// import the styles
import '@solana/wallet-adapter-react-ui/styles.css';

export function useAnchorProvider() {
  const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed'
  );
  const wallet = Keypair.generate();

  try {
    // @ts-expect-error - wallet is dummy variable, signing is not needed
    return new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
  } catch (error) {
    throw error;
  }
}

export function AppWalletProvider(props: PropsWithChildren) {
  
  // const { cluster } = useCluster();
  // const endpoint = useMemo(() => getClusterUrl(cluster), [cluster]);
  const endpoint = 'https://api.devnet.solana.com';

  const wallets = useRef([new TorusWalletAdapter(), new LedgerWalletAdapter()]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets.current} autoConnect>
        <WalletModalProvider>{props.children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}