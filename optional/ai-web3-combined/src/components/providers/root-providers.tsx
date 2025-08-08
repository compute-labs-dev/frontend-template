"use client";

import React from 'react';
import { ThemeProvider } from "./theme-provider";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppWalletProvider } from './app-wallet-provider';
const queryClient = new QueryClient();

export function RootProviders(props: PropsWithChildren<object>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <AppWalletProvider>
            <ThemeProvider
              attribute="class" // Corresponds to Tailwind's darkMode: 'class'
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
          {props.children}</ThemeProvider>
        </AppWalletProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
}