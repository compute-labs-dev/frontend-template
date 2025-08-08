'use client';

import { useTranslations } from 'next-intl';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { ArrowRight, Brain, Sparkles, Wallet, TrendingUp, Shield, Zap, Coins, MessageSquare, Code2, Bot, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const t = useTranslations('greeting');
  const { connected, publicKey } = useWallet();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 py-12'>
      {/* Hero Section */}
      <div className='text-center max-w-5xl mx-auto mb-12'>
        <div className='flex justify-center mb-6 gap-4'>
          <Brain className='h-16 w-16 text-primary animate-pulse' />
          <Sparkles className='h-8 w-8 text-yellow-500 animate-spin-slow mt-4' />
          <Coins className='h-16 w-16 text-primary animate-bounce' />
        </div>
        
        <h1 className='text-5xl md:text-7xl font-bold mb-6'>
          <span className='bg-gradient-to-r from-purple-600 via-primary to-blue-600 bg-clip-text text-transparent'>
            AI + Web3 Powerhouse
          </span>
        </h1>
        <p className='text-xl text-muted-foreground mb-8 max-w-3xl mx-auto'>
          The ultimate development platform combining AI intelligence with blockchain innovation. Build next-generation dApps with LLM capabilities and DeFi features.
        </p>
        
        {/* CTA Buttons */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto'>
          <Link href='/ai-demo'>
            <Button size='lg' variant='outline' className='w-full gap-2'>
              <MessageSquare className='h-4 w-4' />
              AI Chat
            </Button>
          </Link>
          <Link href='/swap'>
            <Button size='lg' variant='outline' className='w-full gap-2'>
              <Coins className='h-4 w-4' />
              Token Swap
            </Button>
          </Link>
          <Link href='/api/ai/chat'>
            <Button size='lg' variant='outline' className='w-full gap-2'>
              <Code2 className='h-4 w-4' />
              AI API
            </Button>
          </Link>
          {!connected ? (
            <WalletMultiButton className='!bg-primary !text-primary-foreground hover:!bg-primary/90 !font-semibold !h-10' />
          ) : (
            <Button size='lg' variant='default' className='gap-2'>
              <Wallet className='h-4 w-4' />
              Connected
            </Button>
          )}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className='w-full max-w-6xl mx-auto mb-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          
          {/* AI Features Section */}
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold flex items-center gap-2'>
              <Brain className='h-8 w-8 text-primary' />
              AI Capabilities
            </h2>
            
            <Card className='hover:shadow-lg transition-shadow border-purple-200 dark:border-purple-900'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Bot className='h-5 w-5 text-purple-600' />
                  Multi-Provider LLMs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground mb-3'>
                  Access OpenAI, Anthropic, Google Gemini, and Ollama models with automatic failover.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <Badge variant='secondary'>GPT-4</Badge>
                  <Badge variant='secondary'>Claude 3</Badge>
                  <Badge variant='secondary'>Gemini</Badge>
                  <Badge variant='secondary'>Llama</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Zap className='h-5 w-5 text-yellow-600' />
                  Intelligent Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  <li>• Streaming responses with real-time updates</li>
                  <li>• Cost tracking and budget management</li>
                  <li>• Automatic model selection optimization</li>
                  <li>• Pre-built chat interface components</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Web3 Features Section */}
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold flex items-center gap-2'>
              <Coins className='h-8 w-8 text-primary' />
              Web3 Features
            </h2>
            
            <Card className='hover:shadow-lg transition-shadow border-blue-200 dark:border-blue-900'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Wallet className='h-5 w-5 text-blue-600' />
                  Solana Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground mb-3'>
                  Full Solana blockchain support with wallet connectivity and DeFi operations.
                </p>
                <div className='flex flex-wrap gap-2'>
                  <Badge variant='secondary'>Phantom</Badge>
                  <Badge variant='secondary'>Backpack</Badge>
                  <Badge variant='secondary'>OKX</Badge>
                  <Badge variant='secondary'>Solflare</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <TrendingUp className='h-5 w-5 text-green-600' />
                  DeFi Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  <li>• Token swap with slippage control</li>
                  <li>• SPL token operations</li>
                  <li>• Transaction management</li>
                  <li>• Real-time blockchain data</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Combined Use Cases */}
      <div className='w-full max-w-6xl mx-auto mb-12'>
        <Card className='bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>AI + Web3 Use Cases</CardTitle>
            <CardDescription>Unlock new possibilities by combining AI and blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='text-center space-y-2'>
                <div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto'>
                  <Activity className='h-6 w-6 text-primary' />
                </div>
                <h4 className='font-semibold'>AI Trading Bots</h4>
                <p className='text-sm text-muted-foreground'>
                  Build intelligent trading systems with LLM analysis and automated execution
                </p>
              </div>
              
              <div className='text-center space-y-2'>
                <div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto'>
                  <Shield className='h-6 w-6 text-primary' />
                </div>
                <h4 className='font-semibold'>Smart Contract Analysis</h4>
                <p className='text-sm text-muted-foreground'>
                  Use AI to audit and analyze smart contracts for security vulnerabilities
                </p>
              </div>
              
              <div className='text-center space-y-2'>
                <div className='w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto'>
                  <MessageSquare className='h-6 w-6 text-primary' />
                </div>
                <h4 className='font-semibold'>DeFi Assistant</h4>
                <p className='text-sm text-muted-foreground'>
                  Natural language interface for complex DeFi operations and portfolio management
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className='w-full max-w-6xl mx-auto mb-12'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <Card>
            <CardContent className='pt-6 text-center'>
              <div className='text-3xl font-bold text-primary'>4+</div>
              <p className='text-sm text-muted-foreground'>AI Providers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6 text-center'>
              <div className='text-3xl font-bold text-primary'>10+</div>
              <p className='text-sm text-muted-foreground'>LLM Models</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6 text-center'>
              <div className='text-3xl font-bold text-primary'>65k</div>
              <p className='text-sm text-muted-foreground'>TPS on Solana</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6 text-center'>
              <div className='text-3xl font-bold text-primary'>$0.00025</div>
              <p className='text-sm text-muted-foreground'>Avg TX Fee</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Developer Section */}
      <div className='w-full max-w-4xl mx-auto text-center'>
        <Card>
          <CardHeader>
            <CardTitle>Full-Stack Web3 + AI Development</CardTitle>
            <CardDescription>
              Everything you need to build the next generation of decentralized applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-6'>
              <code className='bg-muted px-3 py-2 rounded text-xs'>TypeScript</code>
              <code className='bg-muted px-3 py-2 rounded text-xs'>Next.js 14</code>
              <code className='bg-muted px-3 py-2 rounded text-xs'>Solana Web3</code>
              <code className='bg-muted px-3 py-2 rounded text-xs'>OpenAI</code>
              <code className='bg-muted px-3 py-2 rounded text-xs'>Anthropic</code>
              <code className='bg-muted px-3 py-2 rounded text-xs'>Wallet Adapter</code>
              <code className='bg-muted px-3 py-2 rounded text-xs'>Streaming AI</code>
              <code className='bg-muted px-3 py-2 rounded text-xs'>SPL Tokens</code>
            </div>
            <div className='flex justify-center gap-4'>
              <Link href='/ai-demo'>
                <Button size='lg' className='gap-2'>
                  <Brain className='h-4 w-4' />
                  Explore AI Features
                </Button>
              </Link>
              <Link href='/swap'>
                <Button size='lg' variant='outline' className='gap-2'>
                  <Coins className='h-4 w-4' />
                  Try Token Swap
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}