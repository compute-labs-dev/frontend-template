'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TokenSelector } from './token-selector';
import { SwapSettings } from './swap-settings';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowDownUp, Settings, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Token {
  symbol: string;
  name: string;
  mint: string;
  decimals: number;
  logoURI?: string;
  balance?: number;
  price?: number;
}

const DEFAULT_TOKENS: Token[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    mint: 'So11111111111111111111111111111111111111112',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png',
  },
];

interface TokenSwapProps {
  defaultFromToken?: string;
  defaultToToken?: string;
  onSwapComplete?: (txHash: string) => void;
  className?: string;
}

export function TokenSwap({
  defaultFromToken = 'SOL',
  defaultToToken = 'USDC',
  onSwapComplete,
  className = '',
}: TokenSwapProps) {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Initialize tokens
    const from = DEFAULT_TOKENS.find(t => t.symbol === defaultFromToken);
    const to = DEFAULT_TOKENS.find(t => t.symbol === defaultToToken);
    if (from) setFromToken(from);
    if (to) setToToken(to);
  }, [defaultFromToken, defaultToToken]);

  useEffect(() => {
    // Fetch token balances when wallet connects
    if (connected && publicKey) {
      fetchTokenBalances();
    }
  }, [connected, publicKey]);

  useEffect(() => {
    // Fetch quote when amount changes
    const debounceTimer = setTimeout(() => {
      if (fromAmount && fromToken && toToken) {
        fetchQuote();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [fromAmount, fromToken, toToken]);

  const fetchTokenBalances = async () => {
    if (!publicKey) return;

    try {
      // Fetch SOL balance
      const solBalance = await connection.getBalance(publicKey);
      
      // Update token balances
      setFromToken(prev => {
        if (prev?.symbol === 'SOL') {
          return { ...prev, balance: solBalance / LAMPORTS_PER_SOL };
        }
        return prev;
      });

      // TODO: Fetch SPL token balances
    } catch (err) {
      console.error('Error fetching balances:', err);
    }
  };

  const fetchQuote = async () => {
    if (!fromToken || !toToken || !fromAmount) return;

    setIsLoading(true);
    setError(null);

    try {
      // This is a mock quote - in production, you would call Jupiter API
      const mockRate = fromToken.symbol === 'SOL' ? 150 : 1;
      const estimatedOutput = parseFloat(fromAmount) * mockRate;
      
      setToAmount(estimatedOutput.toFixed(6));
      setQuote({
        inputMint: fromToken.mint,
        outputMint: toToken.mint,
        inAmount: parseFloat(fromAmount) * Math.pow(10, fromToken.decimals),
        outAmount: estimatedOutput * Math.pow(10, toToken.decimals),
        priceImpactPct: 0.01,
      });
    } catch (err) {
      setError('Failed to fetch quote');
      console.error('Quote error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!connected || !publicKey || !quote) {
      setError('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // This is a simplified swap - in production, you would:
      // 1. Build the swap transaction using Jupiter API
      // 2. Sign and send the transaction
      // 3. Confirm the transaction
      
      // Mock transaction for demo
      const transaction = new Transaction();
      // Add swap instructions here
      
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      
      if (onSwapComplete) {
        onSwapComplete(signature);
      }

      // Reset form
      setFromAmount('');
      setToAmount('');
      setQuote(null);
      
      // Refresh balances
      await fetchTokenBalances();
      
    } catch (err) {
      setError('Swap failed. Please try again.');
      console.error('Swap error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleMaxAmount = () => {
    if (fromToken?.balance) {
      // Leave some SOL for fees if swapping SOL
      const maxAmount = fromToken.symbol === 'SOL' 
        ? Math.max(0, fromToken.balance - 0.01)
        : fromToken.balance;
      setFromAmount(maxAmount.toString());
    }
  };

  return (
    <Card className={cn('w-full max-w-md mx-auto', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Token Swap</CardTitle>
            <CardDescription>Trade tokens on Solana</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showSettings && (
          <SwapSettings
            slippage={slippage}
            onSlippageChange={setSlippage}
            onClose={() => setShowSettings(false)}
          />
        )}

        {/* From Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>From</Label>
            {fromToken?.balance !== undefined && (
              <span className="text-sm text-muted-foreground">
                Balance: {fromToken.balance.toFixed(4)} {fromToken.symbol}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="flex-1"
            />
            <TokenSelector
              tokens={DEFAULT_TOKENS}
              selectedToken={fromToken}
              onSelect={setFromToken}
            />
          </div>
          {fromToken?.balance !== undefined && (
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={handleMaxAmount}
            >
              Max
            </Button>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center py-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFlipTokens}
            className="rounded-full"
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>To</Label>
            {toToken?.balance !== undefined && (
              <span className="text-sm text-muted-foreground">
                Balance: {toToken.balance.toFixed(4)} {toToken.symbol}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.00"
              value={toAmount}
              readOnly
              className="flex-1 bg-muted"
            />
            <TokenSelector
              tokens={DEFAULT_TOKENS}
              selectedToken={toToken}
              onSelect={setToToken}
            />
          </div>
        </div>

        {/* Quote Info */}
        {quote && (
          <div className="p-3 bg-muted rounded-lg space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate</span>
              <span>
                1 {fromToken?.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4)} {toToken?.symbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price Impact</span>
              <span className={cn(
                quote.priceImpactPct > 1 ? 'text-destructive' : ''
              )}>
                {quote.priceImpactPct.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Slippage Tolerance</span>
              <span>{slippage}%</span>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={!connected || !fromAmount || !toAmount || isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : !connected ? (
            'Connect Wallet'
          ) : !fromAmount ? (
            'Enter Amount'
          ) : (
            'Swap'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}