'use client';
import { cn } from '@/lib/utils';
import React, { useState, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
  activePath: string;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const pathname = usePathname();

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, animate, activePath: pathname }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      {/* <MobileSidebar {...(props as React.ComponentProps<"div">)} /> */}
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <motion.div
        className={cn(
          'border-border/30 hidden overflow-hidden bg-background px-4 py-6 md:flex md:flex-col md:border-r',
          className
        )}
        style={{ width: '220px' }}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          'flex h-10 w-full flex-row items-center justify-between bg-background px-4 py-4 md:hidden'
        )}
        {...props}
      >
        <div className='z-20 flex w-full justify-end'>
          <IconMenu2
            className='text-neutral-800 transition-colors hover:text-primary dark:text-neutral-200'
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className={cn(
                'fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-background p-10',
                className
              )}
            >
              <div
                className='absolute right-10 top-10 z-50 text-neutral-800 transition-colors hover:text-primary dark:text-neutral-200'
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate, activePath } = useSidebar();
  const isActive =
    activePath === link.href ||
    (link.href !== '/' && activePath?.startsWith(link.href));

  return (
    <a
      href={link.href}
      className={cn(
        'group relative my-1 flex items-center gap-3 rounded-md p-2 transition-all duration-200',
        isActive
          ? 'bg-primary/10 font-medium text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        className
      )}
      {...props}
    >
      {/* Icon container with fixed width so it doesn't shift during transitions */}
      <div className='flex min-w-[24px] items-center justify-center'>
        {React.cloneElement(link.icon as React.ReactElement, {
          className: cn(
            'w-5 h-5 transition-transform duration-200',
            isActive
              ? 'text-primary'
              : 'text-muted-foreground group-hover:text-foreground',
            open && 'group-hover:translate-x-0.5'
          ),
        })}
      </div>

      {open && (
      <motion.span
        initial={false}
        animate={{
          opacity: animate ? (open ? 1 : 0) : 1,
          width: animate ? (open ? 'auto' : 0) : 'auto',
        }}
        transition={{ duration: 0.2, ease: [0.3, 0.1, 0.3, 1] }}
        className={cn(
          'overflow-hidden whitespace-nowrap text-sm font-medium',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground group-hover:text-foreground'
        )}
      >
        {link.label}
      </motion.span>
      )}

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className='absolute bottom-0 left-0 top-0 w-1 rounded-full bg-primary'
          layoutId='sidebar-active-indicator'
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </a>
  );
};
