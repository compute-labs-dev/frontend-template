import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('greeting');

  return (
    <div className='flex flex-col items-center justify-center h-full m-auto'>
      <h1 className='text-4xl font-bold text-primary'>{t('welcome')}</h1>

      {/* Theme Color Demo START */}
      <div className='mt-12 w-full max-w-2xl'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>Theme Color Demo</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
          {/* Primary Colors */}
          <div className='p-4 bg-primary rounded-lg text-primary-foreground'>Primary (bg-primary)</div>
          <div className='p-4 bg-primary-light rounded-lg text-primary-dark'>Primary Light (bg-primary-light)</div>
          <div className='p-4 bg-primary-dark rounded-lg text-primary-light'>Primary Dark (bg-primary-dark)</div>
          
          {/* Semantic Colors (using CSS variables) */}
          <div className='p-4 bg-secondary rounded-lg text-secondary-foreground'>Secondary (bg-secondary)</div>
          <div className='p-4 bg-muted rounded-lg text-muted-foreground'>Muted (bg-muted)</div>
          <div className='p-4 bg-background rounded-lg text-foreground border'>Background (bg-background)</div>
          <div className='p-4 bg-foreground rounded-lg text-background border'>Foreground (bg-foreground)</div>
          <div className='p-4 bg-error rounded-lg text-error-foreground'>Error (bg-error)</div>
          <div className='p-4 bg-success rounded-lg text-success-foreground'>Success (bg-success)</div>

          {/* Gray Shades */}
          <div className='p-4 bg-gray-DEFAULT rounded-lg text-white'>Gray Default (bg-gray-DEFAULT)</div>
          <div className='p-4 bg-gray-light rounded-lg text-gray-compute'>Gray Light (bg-gray-light)</div>
          <div className='p-4 bg-gray-compute rounded-lg text-gray-light'>Gray Compute (bg-gray-compute)</div>
        </div>
      </div>
      {/* Theme Color Demo END */}
    </div>
  );
} 