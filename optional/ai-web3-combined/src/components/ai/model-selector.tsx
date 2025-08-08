'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AI_PROVIDERS } from '@/lib/ai/config';
import { Badge } from '@/components/ui/badge';

interface ModelSelectorProps {
  currentProvider: string;
  currentModel: string;
  onProviderChange: (provider: string) => void;
  onModelChange: (model: string) => void;
}

export function ModelSelector({
  currentProvider,
  currentModel,
  onProviderChange,
  onModelChange,
}: ModelSelectorProps) {
  const provider = AI_PROVIDERS[currentProvider];
  
  const getProviderBadgeColor = (providerKey: string) => {
    switch (providerKey) {
      case 'openai':
        return 'bg-green-500/10 text-green-500';
      case 'anthropic':
        return 'bg-orange-500/10 text-orange-500';
      case 'gemini':
        return 'bg-blue-500/10 text-blue-500';
      case 'ollama':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={currentProvider} onValueChange={onProviderChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(AI_PROVIDERS).map(([key, provider]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center gap-2">
                <span>{provider.name}</span>
                {key === 'ollama' && (
                  <Badge variant="secondary" className="text-xs">
                    Local
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={currentModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {provider?.models.map((model) => (
            <SelectItem key={model} value={model}>
              <div className="flex items-center justify-between w-full">
                <span className="truncate">{model}</span>
                {model.includes('turbo') && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Fast
                  </Badge>
                )}
                {model.includes('opus') && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Best
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Badge className={getProviderBadgeColor(currentProvider)}>
        {provider?.name}
      </Badge>
    </div>
  );
}