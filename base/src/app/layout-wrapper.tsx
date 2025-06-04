import React from 'react';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Newsletter from '@/components/common/newsletter';
import { ThemeProvider } from '@/components/providers/theme-provider';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <div className='relative flex min-h-screen flex-col bg-fogGradientLight dark:bg-fogGradientDark'>
        <Header />
        <div className='relative h-full flex-1'>
            <main className='h-full overflow-auto'>
              <div className='flex h-full'>
                <div className='flex-1'>{children}</div>
              </div>
            </main>
            <Newsletter />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default LayoutWrapper;
