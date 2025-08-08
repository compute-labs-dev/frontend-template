'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChatMessage, ChatOptions, AI_PROVIDERS } from '@/lib/ai/config';
import { AIService } from '@/lib/ai/ai-service';

export function useAI() {
  const [currentProvider, setCurrentProvider] = useState<string>('openai');
  const [currentModel, setCurrentModel] = useState<string>('gpt-3.5-turbo');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState({
    monthlyBudget: 100,
    monthlyUsage: 0,
    remainingBudget: 100,
    usagePercentage: 0,
  });

  useEffect(() => {
    // Initialize from environment or localStorage
    const savedProvider = localStorage.getItem('ai_provider') || process.env.NEXT_PUBLIC_DEFAULT_AI_PROVIDER || 'openai';
    const savedModel = localStorage.getItem('ai_model') || process.env.NEXT_PUBLIC_DEFAULT_MODEL || 'gpt-3.5-turbo';
    
    setCurrentProvider(savedProvider);
    setCurrentModel(savedModel);
  }, []);

  const sendMessage = useCallback(
    async (messages: ChatMessage[], options?: ChatOptions) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages,
            provider: currentProvider,
            model: options?.model || currentModel,
            options: {
              ...options,
              stream: options?.stream !== false, // Default to streaming
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        if (options?.stream !== false) {
          // Handle streaming response
          const reader = response.body?.getReader();
          if (!reader) throw new Error('No response body');

          const decoder = new TextDecoder();
          
          async function* streamGenerator() {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              
              const chunk = decoder.decode(value);
              const lines = chunk.split('\n').filter(line => line.trim());
              
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  if (data === '[DONE]') return;
                  
                  try {
                    const parsed = JSON.parse(data);
                    if (parsed.content) {
                      yield parsed.content;
                    }
                  } catch (e) {
                    // Skip invalid JSON
                  }
                }
              }
            }
          }

          return streamGenerator();
        } else {
          // Non-streaming response
          const data = await response.json();
          return data.content;
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
        // Update usage stats
        updateUsageStats();
      }
    },
    [currentProvider, currentModel]
  );

  const complete = useCallback(
    async (prompt: string, options?: ChatOptions) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/ai/completion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            provider: currentProvider,
            model: options?.model || currentModel,
            options,
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.content;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
        updateUsageStats();
      }
    },
    [currentProvider, currentModel]
  );

  const switchProvider = useCallback((provider: string) => {
    if (AI_PROVIDERS[provider]) {
      setCurrentProvider(provider);
      localStorage.setItem('ai_provider', provider);
      
      // Set default model for the provider
      const defaultModel = AI_PROVIDERS[provider].models[0];
      setCurrentModel(defaultModel);
      localStorage.setItem('ai_model', defaultModel);
    }
  }, []);

  const switchModel = useCallback((model: string) => {
    setCurrentModel(model);
    localStorage.setItem('ai_model', model);
  }, []);

  const updateUsageStats = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/usage');
      if (response.ok) {
        const stats = await response.json();
        setUsage(stats);
      }
    } catch (err) {
      console.error('Failed to fetch usage stats:', err);
    }
  }, []);

  const estimateCost = useCallback(
    (text: string) => {
      // This would call the AI service to estimate cost
      // For now, return a simple estimate
      const tokensEstimate = Math.ceil(text.length / 4);
      const costPerToken = 0.000002; // Example rate
      return tokensEstimate * costPerToken;
    },
    [currentModel]
  );

  return {
    sendMessage,
    complete,
    switchProvider,
    switchModel,
    estimateCost,
    currentProvider,
    currentModel,
    isLoading,
    error,
    usage,
  };
}