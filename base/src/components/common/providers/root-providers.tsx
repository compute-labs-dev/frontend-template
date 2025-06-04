"use client";

import React from 'react';
import { ThemeProvider } from "./theme-provider";
import ReduxProvider from "./redux-provider";

interface RootProvidersProps {
  children: React.ReactNode;
  // Add any other initial props your providers might need, e.g., for ThemeProvider
  // initialTheme?: string;
}

export function RootProviders({ children }: Readonly<RootProvidersProps>) {
  return (
    <ReduxProvider>
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