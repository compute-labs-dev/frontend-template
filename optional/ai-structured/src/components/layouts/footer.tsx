import LogoComponent from '@/components/common/logo';
import Newsletter from '@/components/common/newsletter';
import Link from 'next/link';
import { Brain, MessageSquare, Code2, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer id='footer' className='w-full bg-background px-4 pb-16 pt-20 dark:bg-gray-900 md:px-6'>
      <div className='section-margin mx-auto'>
        <Newsletter />
      </div>
      <div className='section-margin mx-auto mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4'>
        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <LogoComponent />
            <Brain className='h-5 w-5 text-primary animate-pulse' />
          </div>
          <p className='text-sm text-muted-foreground'>
            AI-powered applications with multi-provider LLM support
          </p>
        </div>

        <div>
          <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider text-foreground'>AI Features</h3>
          <ul className='space-y-2'>
            <li>
              <Link href='/ai-demo' className='flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors'>
                <MessageSquare className='h-3 w-3' />
                Chat Demo
              </Link>
            </li>
            <li>
              <Link href='/api/ai/chat' className='flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors'>
                <Code2 className='h-3 w-3' />
                API Documentation
              </Link>
            </li>
            <li>
              <a href='#models' className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Supported Models
              </a>
            </li>
            <li>
              <a href='#providers' className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                AI Providers
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider text-foreground'>Resources</h3>
          <ul className='space-y-2'>
            <li>
              <a href='https://platform.openai.com/docs' target='_blank' rel='noopener noreferrer' className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                OpenAI Docs
              </a>
            </li>
            <li>
              <a href='https://docs.anthropic.com' target='_blank' rel='noopener noreferrer' className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Anthropic Docs
              </a>
            </li>
            <li>
              <a href='https://ai.google.dev' target='_blank' rel='noopener noreferrer' className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Google AI Docs
              </a>
            </li>
            <li>
              <a href='https://ollama.ai' target='_blank' rel='noopener noreferrer' className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Ollama (Local AI)
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider text-foreground'>Legal</h3>
          <ul className='space-y-2'>
            <li>
              <Link href='/privacy' className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href='/terms' className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Terms of Use
              </Link>
            </li>
            <li>
              <a href='#ai-usage' className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                AI Usage Policy
              </a>
            </li>
            <li>
              <a href='#data-handling' className='text-sm text-muted-foreground hover:text-primary transition-colors'>
                Data Handling
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='section-margin mx-auto mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row'>
        <p className='text-sm text-muted-foreground'>
          © {new Date().getFullYear()} Compute Labs. All rights reserved.
        </p>
        <div className='flex items-center gap-4'>
          <a href='https://github.com/compute-labs' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-primary transition-colors'>
            <Github className='h-5 w-5' />
          </a>
          <span className='text-xs text-muted-foreground'>
            Powered by OpenAI, Anthropic, Google & Ollama
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;