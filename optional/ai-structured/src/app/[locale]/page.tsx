'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Brain, Sparkles, Zap, Shield, Code2, MessageSquare, Bot, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const t = useTranslations('greeting');

  const providers = [
    { name: 'OpenAI', models: ['GPT-4', 'GPT-3.5'], color: 'bg-green-500' },
    { name: 'Anthropic', models: ['Claude 3 Opus', 'Claude 3 Sonnet'], color: 'bg-purple-500' },
    { name: 'Google', models: ['Gemini Pro', 'Gemini Pro Vision'], color: 'bg-blue-500' },
    { name: 'Ollama', models: ['Llama 2', 'Mistral', 'CodeLlama'], color: 'bg-orange-500' },
  ];

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 py-12'>
      {/* Hero Section */}
      <div className='text-center max-w-4xl mx-auto mb-12'>
        <div className='flex justify-center mb-6'>
          <div className='relative'>
            <Brain className='h-20 w-20 text-primary animate-pulse' />
            <Sparkles className='h-8 w-8 text-primary absolute -top-2 -right-2 animate-spin-slow' />
          </div>
        </div>
        
        <h1 className='text-5xl md:text-6xl font-bold mb-6'>
          <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            AI-Powered Applications
          </span>
        </h1>
        <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
          Build intelligent applications with multi-provider LLM support, streaming responses, and advanced AI capabilities.
        </p>
        
        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8'>
          <Link href='/ai-demo'>
            <Button size='lg' className='gap-2'>
              <MessageSquare className='h-4 w-4' />
              Try AI Chat Demo
              <ArrowRight className='h-4 w-4' />
            </Button>
          </Link>
          <Link href='/api/ai/chat'>
            <Button size='lg' variant='outline' className='gap-2'>
              <Code2 className='h-4 w-4' />
              View API Endpoints
            </Button>
          </Link>
        </div>

        {/* Provider Badges */}
        <div className='flex flex-wrap justify-center gap-2'>
          {providers.map((provider) => (
            <Badge key={provider.name} variant='secondary' className='px-3 py-1'>
              <span className={`w-2 h-2 rounded-full ${provider.color} mr-2`} />
              {provider.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className='w-full max-w-6xl mx-auto mb-12'>
        <h2 className='text-3xl font-bold text-center mb-8'>AI Features</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Bot className='h-5 w-5 text-primary' />
                Multi-Provider Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground mb-3'>
                Seamlessly switch between OpenAI, Anthropic, Google Gemini, and local Ollama models.
              </p>
              <div className='flex flex-wrap gap-1'>
                {['OpenAI', 'Claude', 'Gemini', 'Ollama'].map((name) => (
                  <span key={name} className='text-xs bg-muted px-2 py-1 rounded'>
                    {name}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Zap className='h-5 w-5 text-primary' />
                Streaming Responses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Real-time streaming for instant feedback with support for markdown, code highlighting, and rich content.
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <MessageSquare className='h-5 w-5 text-primary' />
                Chat Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground mb-3'>
                Pre-built chat UI with message history, typing indicators, and error handling.
              </p>
              <Link href='/ai-demo'>
                <Button variant='ghost' size='sm' className='gap-2 p-0'>
                  Try demo <ArrowRight className='h-3 w-3' />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Shield className='h-5 w-5 text-primary' />
                Cost Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Automatic failover between providers, token usage tracking, and budget management.
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Code2 className='h-5 w-5 text-primary' />
                API Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                RESTful API endpoints for chat and completions, ready for integration with any frontend.
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Cpu className='h-5 w-5 text-primary' />
                Local & Cloud
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Support for both cloud-based APIs and local models via Ollama for privacy-focused deployments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Model Comparison */}
      <div className='w-full max-w-5xl mx-auto mb-12'>
        <Card className='bg-gradient-to-br from-primary/5 to-primary/10'>
          <CardHeader>
            <CardTitle>Available AI Models</CardTitle>
            <CardDescription>Choose the right model for your use case</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {providers.map((provider) => (
                <div key={provider.name} className='space-y-2'>
                  <div className='font-semibold flex items-center gap-2'>
                    <span className={`w-3 h-3 rounded-full ${provider.color}`} />
                    {provider.name}
                  </div>
                  <div className='space-y-1'>
                    {provider.models.map((model) => (
                      <div key={model} className='text-sm text-muted-foreground pl-5'>
                        • {model}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Code Example */}
      <div className='w-full max-w-4xl mx-auto mb-12'>
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Get started with AI in seconds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='bg-muted rounded-lg p-4 font-mono text-sm'>
              <div className='text-green-600'>// Example: Using the AI service</div>
              <div className='mt-2'>
                <span className='text-blue-600'>import</span> {`{ aiService }`} <span className='text-blue-600'>from</span> <span className='text-orange-600'>'@/lib/ai/ai-service'</span>;
              </div>
              <div className='mt-2'>
                <span className='text-blue-600'>const</span> response = <span className='text-blue-600'>await</span> aiService.<span className='text-yellow-600'>chat</span>({`{`}
              </div>
              <div className='pl-4'>
                messages: [{`{ role: 'user', content: 'Hello!' }`}],
              </div>
              <div className='pl-4'>
                model: <span className='text-orange-600'>'gpt-4'</span>,
              </div>
              <div className='pl-4'>
                stream: <span className='text-purple-600'>true</span>
              </div>
              <div>{`}`});</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Developer Tools */}
      <div className='w-full max-w-4xl mx-auto text-center'>
        <Card>
          <CardHeader>
            <CardTitle>Built for Developers</CardTitle>
            <CardDescription>
              This template includes everything you need to build AI-powered applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
              <code className='bg-muted px-3 py-2 rounded text-sm'>TypeScript</code>
              <code className='bg-muted px-3 py-2 rounded text-sm'>Vercel AI SDK</code>
              <code className='bg-muted px-3 py-2 rounded text-sm'>Streaming</code>
              <code className='bg-muted px-3 py-2 rounded text-sm'>Error Handling</code>
              <code className='bg-muted px-3 py-2 rounded text-sm'>Rate Limiting</code>
              <code className='bg-muted px-3 py-2 rounded text-sm'>Token Tracking</code>
            </div>
            <div className='mt-6 flex justify-center gap-4'>
              <Link href='/ai-demo'>
                <Button>Open Chat Demo</Button>
              </Link>
              <Button variant='outline' asChild>
                <a href='https://github.com/compute-labs/ai-template' target='_blank' rel='noopener noreferrer'>
                  View Documentation
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}