'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import LogoImage from '@/assets/logo.png';
import DarkLogoImage from '@/assets/dark-logo.svg';
import TwitterIcon from '@/assets/icons/TwitterIcon';
import LinkedinIcon from '@/assets/icons/LinkedinIcon';
import TelegramIcon from '@/assets/icons/TelegramIcon';
import DiscordIcon from '@/assets/icons/DiscordIcon';
import MediumIcon from '@/assets/icons/MediumIcon';
import { useTheme } from 'next-themes';

const LINKS = {
  company: [
    // { title: 'Home', href: '/' },
    // { title: 'Invest', href: '/invest' },
    // { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
    // { title: 'News', href: '/news' },
    { title: 'Docs', href: 'https://compute-labs.gitbook.io/compute-labs' },
  ],
  legal: [
    {
      title: 'Privacy Policy',
      href: 'https://drive.google.com/file/d/1epJeZO96H_YUGtI4HMwnWxrGL7-g_LiI/view?usp=sharing',
    },
    {
      title: 'Terms of Use',
      href: 'https://drive.google.com/file/d/195yDgXofHwmnXcoHx0TymXMGBYcbcsn-/view?usp=sharing',
    },
    // {
    //   title: 'Media Kit',
    //   href: 'https://drive.google.com/drive/folders/1fUPzJBNPaF5MNqhhqji2Fi7nKaY-tOD-'
    // }
  ],
  social: [
    {
      title: 'Twitter',
      href: 'https://x.com/Compute_Labs',
      icon: <TwitterIcon className='h-5 w-5' />,
    },
    {
      title: 'Medium',
      href: 'https://medium.com/@Compute_Labs',
      icon: <MediumIcon className='h-5 w-5' />,
    },
    {
      title: 'Discord',
      href: 'http://discord.gg/computelabs',
      icon: <DiscordIcon className='h-5 w-5' />,
    },
    {
      title: 'Telegram',
      href: 'https://t.me/Compute_Labs_Channel',
      icon: <TelegramIcon className='h-5 w-5' />,
    },
    {
      title: 'LinkedIn',
      href: 'https://www.linkedin.com/company/computelabs-ai',
      icon: <LinkedinIcon className='h-5 w-5' />,
    },
  ],
};

declare const VANTA: {
  FOG: (params: {
    el: HTMLElement;
    mouseControls: boolean;
    touchControls: boolean;
    gyroControls: boolean;
    minHeight: number;
    minWidth: number;
    blurFactor: number;
    speed: number;
    zoom: number;
    highlightColor: number;
    midtoneColor: number;
    lowlightColor: number;
    baseColor: number;
  }) => VantaEffect;
};

interface VantaEffect {
  destroy: () => void;
}

export default function Footer() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaRefDark = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  const initializeVantaEffect = useCallback((isDark: boolean) => {
    if (typeof VANTA === 'undefined') return;

    const ref = isDark ? vantaRefDark.current : vantaRef.current;
    if (!ref) return;

    // Cleanup existing effects first
    if (vantaEffect) {
      vantaEffect.destroy();
      setVantaEffect(null);
    }
    const config = {
      el: ref,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      blurFactor: 0.88,
      speed: 4.0,
      zoom: 0.1,
      ...(isDark
        ? {
            highlightColor: 0x1a4d1a,
            midtoneColor: 0x1e293b,
            lowlightColor: 0x4a2617,
            baseColor: 0x0f172a,
          }
        : {
            highlightColor: 0xb6f0b6,
            midtoneColor: 0xffffff,
            lowlightColor: 0xffffff,
            baseColor: 0xffffff,
          }),
    };

    try {
      const newEffect = VANTA.FOG(config);
      setVantaEffect(newEffect);
    } catch (error) {
      console.error('Failed to initialize Vanta effect:', error);
    }
  }, [vantaEffect]);

  useEffect(() => {
    if (!mounted) return;

    const isDark = resolvedTheme === 'dark';
    const timer = setTimeout(() => {
      initializeVantaEffect(isDark);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
    };
  }, [mounted, resolvedTheme, initializeVantaEffect, vantaEffect]);

  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <footer className='relative z-[99] w-full dark:bg-fogGradientDark'>
      <div className='absolute inset-x-0 top-0 -z-10 h-full overflow-hidden'>
        <div
          ref={vantaRef}
          className='absolute inset-0 w-full bg-transparent dark:hidden'
          style={{
            maskImage: `linear-gradient(0deg, 
              rgba(0, 0, 0, 1) 0%, 
              rgba(0, 0, 0, 1) 30%, 
              rgba(0, 0, 0, 0.8) 50%, 
              rgba(0, 0, 0, 0.3) 80%, 
              rgba(0, 0, 0, 0) 100%
            )`,
            WebkitMaskImage: `linear-gradient(0deg, 
              rgba(0, 0, 0, 1) 0%, 
              rgba(0, 0, 0, 1) 30%, 
              rgba(0, 0, 0, 0.8) 50%, 
              rgba(0, 0, 0, 0.3) 80%, 
              rgba(0, 0, 0, 0) 100%
            )`,
          }}
        />
      </div>

      <div className='w-full px-4 py-4 md:py-6'>
        {/* Desktop Footer */}
        <div className='hidden md:block'>
          <div className='mx-auto grid grid-cols-4 gap-8'>
            {/* Logo and Social Section */}
            <div>
              <Link className='mb-3 block' href='/'>
                <Image
                  src={LogoImage}
                  alt='Compute Labs'
                  className='h-9 w-auto dark:hidden'
                  unoptimized
                  quality={100}
                />
                <Image
                  src={DarkLogoImage}
                  alt='Compute Labs'
                  className='hidden h-9 w-auto dark:block'
                  width={300}
                  height={88}
                />
              </Link>

              <div className='mt-4 flex flex-wrap gap-3'>
                {LINKS.social.map((social) => (
                  <Link
                    key={social.title}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-primary dark:invert dark:hover:border dark:hover:border-2 dark:hover:border-black dark:hover:bg-transparent'
                    aria-label={`Visit our ${social.title} page`}
                  >
                    <span aria-hidden='true'>{social.icon}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className='col-span-2'>
              <div className='grid grid-cols-2'>
                <div>
                  <h3
                    className='text-sm font-semibold text-foreground dark:text-gray-100'
                    id='company-links'
                  >
                    Company
                  </h3>
                  <ul className='mt-3 space-y-2' aria-labelledby='company-links'>
                    {LINKS.company.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className='text-sm text-gray-600 hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
                          aria-label={`Visit ${link.title} page`}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3
                    className='text-sm font-semibold text-foreground dark:text-gray-100'
                    id='legal-links'
                  >
                    Legal
                  </h3>
                  <ul className='mt-3 space-y-2' aria-labelledby='legal-links'>
                    {LINKS.legal.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          className='text-sm text-gray-600 hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
                          target='_blank'
                          rel='noopener noreferrer'
                          aria-label={`${link.title} (opens in new tab)`}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3
                className='text-sm font-semibold text-foreground dark:text-gray-100'
                id='newsletter-section'
              >
                Stay up to date
              </h3>
              <p
                className='mt-3 text-sm text-gray-600 dark:text-gray-400'
                id='newsletter-description'
              >
                Subscribe to our newsletter for updates and announcements.
              </p>
              <button
                onClick={() => setWaitlistOpen(true)}
                className='mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                aria-labelledby='newsletter-section newsletter-description'
              >
                <span>Subscribe</span>
                <Send className='h-4 w-4' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Footer - Compact Version */}
        <div className='md:hidden'>
          <div className='mb-4 flex items-center justify-between'>
            <Link href='/'>
              <Image
                src={LogoImage}
                alt='Compute Labs'
                className='h-8 w-auto dark:hidden'
                unoptimized
                quality={100}
              />
              <Image
                src={DarkLogoImage}
                alt='Compute Labs'
                className='hidden h-8 w-auto dark:block'
                width={200}
                height={58}
              />
            </Link>
            
            <button
              onClick={() => setWaitlistOpen(true)}
              className='flex items-center justify-center gap-1 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-gray-700'
              aria-label='Subscribe to newsletter'
            >
              <span>Subscribe</span>
              <Send className='h-3 w-3' aria-hidden='true' />
            </button>
          </div>
          
          <div className='flex flex-wrap justify-between'>
            <div className='mb-3 w-1/2'>
              <h3 className='text-xs font-semibold text-foreground dark:text-gray-100'>
                Company
              </h3>
              <ul className='mt-2 space-y-1.5'>
                {LINKS.company.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className='text-xs text-gray-600 dark:text-gray-400'
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className='mb-3 w-1/2'>
              <h3 className='text-xs font-semibold text-foreground dark:text-gray-100'>
                Legal
              </h3>
              <ul className='mt-2 space-y-1.5'>
                {LINKS.legal.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className='text-xs text-gray-600 dark:text-gray-400'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className='mt-3 flex justify-center space-x-3 border-t border-gray-200 pt-3 dark:border-gray-800'>
            {LINKS.social.map((social) => (
              <Link
                key={social.title}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:text-gray-400'
                aria-label={`Visit our ${social.title} page`}
              >
                <span aria-hidden='true' className='scale-75'>{social.icon}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
