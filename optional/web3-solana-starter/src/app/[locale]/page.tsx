'use client';

import { useTranslations } from 'next-intl';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { ArrowRight, Wallet, TrendingUp, Shield, Zap, Coins, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const t = useTranslations('greeting');
  const { connected, publicKey } = useWallet();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 py-12'>
      {/* Hero Section */}
      <div className='text-center max-w-4xl mx-auto mb-12'>
        <h1 className='text-5xl md:text-6xl font-bold mb-6'>
          <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            DeFi on Solana
          </span>
        </h1>
        <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
          Trade, swap, and manage your digital assets with lightning-fast transactions and minimal fees on the Solana blockchain.
        </p>
        
        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8'>
          {!connected ? (
            <WalletMultiButton className='!bg-primary !text-primary-foreground hover:!bg-primary/90 !font-semibold !px-6 !py-3' />
          ) : (
            <div className='flex flex-col items-center gap-2'>
              <span className='text-sm text-muted-foreground'>Connected:</span>
              <code className='text-xs bg-muted px-2 py-1 rounded'>
                {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
              </code>
            </div>
          )}
          <Link href='/swap'>
            <Button size='lg' variant={connected ? 'default' : 'outline'} className='gap-2'>
              Launch Token Swap
              <ArrowRight className='h-4 w-4' />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className='w-full max-w-6xl mx-auto mb-12'>
        <h2 className='text-3xl font-bold text-center mb-8'>Web3 Features</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Coins className='h-5 w-5 text-primary' />
                Token Swap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground mb-4'>
                Instantly swap between SPL tokens with our intuitive interface and competitive rates.
              </p>
              <Link href='/swap'>
                <Button variant='ghost' className='gap-2 p-0'>
                  Try it now <ArrowRight className='h-4 w-4' />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Wallet className='h-5 w-5 text-primary' />
                Multi-Wallet Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Connect with Phantom, Backpack, OKX, and other popular Solana wallets seamlessly.
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Activity className='h-5 w-5 text-primary' />
                Real-Time Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Access live token prices, liquidity pools, and transaction history in real-time.
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5 text-primary' />
                Secure & Non-Custodial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Your keys, your crypto. All transactions are executed directly from your wallet.
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Zap className='h-5 w-5 text-primary' />
                Lightning Fast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Leverage Solana's 65,000 TPS capacity for near-instant transaction confirmations.
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <TrendingUp className='h-5 w-5 text-primary' />
                Best Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Smart routing across multiple DEXs ensures you always get the best swap rates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='w-full max-w-4xl mx-auto'>
        <Card className='bg-gradient-to-br from-primary/10 to-primary/5'>
          <CardContent className='pt-6'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
              <div>
                <p className='text-3xl font-bold text-primary'>400ms</p>
                <p className='text-sm text-muted-foreground'>Block Time</p>
              </div>
              <div>
                <p className='text-3xl font-bold text-primary'>$0.00025</p>
                <p className='text-sm text-muted-foreground'>Avg Transaction Fee</p>
              </div>
              <div>
                <p className='text-3xl font-bold text-primary'>65,000</p>
                <p className='text-sm text-muted-foreground'>TPS Capacity</p>
              </div>
              <div>
                <p className='text-3xl font-bold text-primary'>100+</p>
                <p className='text-sm text-muted-foreground'>Supported Tokens</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Developer Section */}
      <div className='w-full max-w-4xl mx-auto mt-12 text-center'>
        <Card>
          <CardHeader>
            <CardTitle>Built for Developers</CardTitle>
            <CardDescription>
              This template includes everything you need to build DeFi applications on Solana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap justify-center gap-3'>
              <code className='bg-muted px-3 py-1 rounded text-sm'>@solana/web3.js</code>
              <code className='bg-muted px-3 py-1 rounded text-sm'>@solana/wallet-adapter</code>
              <code className='bg-muted px-3 py-1 rounded text-sm'>@coral-xyz/anchor</code>
              <code className='bg-muted px-3 py-1 rounded text-sm'>@solana/spl-token</code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}