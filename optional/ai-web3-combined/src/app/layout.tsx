import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { RootProviders } from "@/components/providers/root-providers"; 
import './globals.css';

export const metadata: Metadata = {
  title: 'Compute Labs | Your gateway to AI & compute investments',
  description:
    'Financialize AI by enabling direct exposure to compute assets, yield, & derivatives',
  openGraph: {
    title:
      'Compute Labs | Building AI-Fi and enabling direct exposure to AI compute assets',
    description:
      'Financialize AI by enabling direct exposure to compute assets, yield, & derivatives',
    images: [
      {
        url: '/logo-shared.jpg',
        width: 1200,
        height: 630,
        alt: 'Compute Labs logo or description',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Compute Labs | Building AI-Fi and enabling direct exposure to AI compute assets',
    description:
      'Financialize AI by enabling direct exposure to compute assets, yield, & derivatives',
    images: ['/logo-shared.jpg'],
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale || 'en'} className='h-screen w-screen overflow-y-scroll overflow-x-hidden' suppressHydrationWarning>
      <body className='h-full w-full antialiased' suppressHydrationWarning>
        <RootProviders>{children}</RootProviders>
        <Toaster />
      </body>
    </html>
  );
}