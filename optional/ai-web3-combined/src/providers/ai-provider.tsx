'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAI } from '@/hooks/useAI';

interface AIContextType {
  sendMessage: ReturnType<typeof useAI>['sendMessage'];
  complete: ReturnType<typeof useAI>['complete'];
  switchProvider: ReturnType<typeof useAI>['switchProvider'];
  switchModel: ReturnType<typeof useAI>['switchModel'];
  estimateCost: ReturnType<typeof useAI>['estimateCost'];
  currentProvider: string;
  currentModel: string;
  isLoading: boolean;
  error: string | null;
  usage: ReturnType<typeof useAI>['usage'];
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const ai = useAI();

  return (
    <AIContext.Provider value={ai}>
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAIContext must be used within an AIProvider');
  }
  return context;
}