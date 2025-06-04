'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className='w-full'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex w-full items-center border-t-2 border-gray-light px-2 py-2.5 transition-all dark:text-gray-100 md:px-0 md:py-3 2xl:py-2 [&[data-state=open]>svg]:rotate-45 [&[data-state=open]]:border-primary [&[data-state=open]]:pb-3 [&[data-state=open]]:pt-6 [&[data-state=open]]:md:pb-2 [&[data-state=open]]:md:pt-5',
        className
      )}
      {...props}
    >
      <div className='md:text-md 2xl:text-md w-0 grow text-left text-[15px] font-semibold text-gray-compute dark:text-gray-100'>
        {children}
      </div>
      <Plus className='size-[14px] text-primary transition-all duration-200 md:size-[21px] 2xl:size-8' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down dark:text-gray-100'
    {...props}
  >
    <div
      className={cn(
        'text-balance max-w-[344px] px-2 pb-7 pt-0 text-sm font-medium text-gray dark:text-gray-100 md:px-0 lg:max-w-full',
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
