import Image from 'next/image';
import Link from 'next/link';
import MobileLogo from '@/assets/mobile-logo.png';
import DarkMobileLogoSVG from '@/assets/dark-mobile-logo.svg';
import Logo from '@/assets/logo.png';
import DarkLogoSVG from '@/assets/dark-logo.svg';

const LogoComponent = () => {
  return (
    <Link href={'/'} className='mr-auto block'>
      <div className='block dark:hidden'>
        {/* Mobile Logo */}
        <Image
          src={MobileLogo}
          alt='logo'
          width={220}
          height={220}
          className={`h-auto w-[38px] md:hidden`}
          priority
          quality={100}
        />
        {/* Desktop Logo */}
        <Image
          src={Logo}
          alt='logo'
          width={300}
          height={88} 
          className={`hidden md:block dark:hidden h-auto w-[120px] lg:w-[150px]`}
          priority
          quality={100}
        />
      </div>
      <div className='hidden dark:block'>
        {/* Mobile Logo */}
        <Image
          src={DarkMobileLogoSVG}
          alt='logo'
          width={220}
          height={220}
          className={`h-auto w-[38px] md:hidden`}
          priority
          quality={100}
        />
        {/* Desktop Logo */}
        <Image
          src={DarkLogoSVG}
          alt='logo'
          width={300}
          height={88}
          className={`hidden md:block h-auto w-[120px] lg:w-[150px] `}
          priority
          quality={100}
        />
      </div>
    </Link>
  );
};

export default LogoComponent; 