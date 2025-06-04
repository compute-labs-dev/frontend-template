"use client";

import React from 'react';
import { ThemeProvider } from "./theme-provider";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';

interface RootProvidersProps {
  children: React.ReactNode;
}

export function RootProviders({ children }: Readonly<RootProvidersProps>) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider
        attribute="class" // Corresponds to Tailwind's darkMode: 'class'
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
} 