'use client';

import React from 'react';
import { TokenSwap } from '@/components/defi/token-swap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon, TrendingUp, Shield, Zap } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function SwapPage() {
  const { connected } = useWallet();

  const handleSwapComplete = (txHash: string) => {
    console.log('Swap completed:', txHash);
    // You could show a success toast or redirect to a transaction explorer
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Token Swap
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trade tokens instantly on Solana with minimal fees and maximum security
          </p>
        </div>

        {/* Wallet Connection Alert */}
        {!connected && (
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Connect your wallet to start swapping tokens</span>
              <WalletMultiButton className="!bg-primary !text-primary-foreground hover:!bg-primary/90" />
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Swap Interface */}
          <div className="lg:col-span-2">
            <TokenSwap
              defaultFromToken="SOL"
              defaultToToken="USDC"
              onSwapComplete={handleSwapComplete}
            />
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Best Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our smart routing finds the best prices across multiple DEXs to ensure you get optimal rates for your swaps.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Secure & Transparent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All transactions are executed on-chain with full transparency. Your funds never leave your wallet until the swap is confirmed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Lightning Fast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Powered by Solana's high-performance blockchain, swaps are confirmed in seconds with minimal network fees.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Statistics</CardTitle>
            <CardDescription>Real-time trading metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-bold">$1.2B+</p>
                <p className="text-sm text-muted-foreground">Total Volume</p>
              </div>
              <div>
                <p className="text-2xl font-bold">50K+</p>
                <p className="text-sm text-muted-foreground">Total Swaps</p>
              </div>
              <div>
                <p className="text-2xl font-bold">100+</p>
                <p className="text-sm text-muted-foreground">Supported Tokens</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">What is slippage tolerance?</h4>
              <p className="text-sm text-muted-foreground">
                Slippage tolerance is the maximum price change you're willing to accept when your swap is executed. A higher tolerance increases the chance of success but may result in a less favorable rate.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Are there any fees?</h4>
              <p className="text-sm text-muted-foreground">
                The platform charges a small fee of 0.25% per swap. Network fees (gas) are paid separately and vary based on network congestion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">How long does a swap take?</h4>
              <p className="text-sm text-muted-foreground">
                Swaps on Solana typically confirm within 1-2 seconds. In rare cases of network congestion, it may take up to 30 seconds.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}