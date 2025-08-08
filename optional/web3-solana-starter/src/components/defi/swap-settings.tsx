'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface SwapSettingsProps {
  slippage: number;
  onSlippageChange: (value: number) => void;
  onClose: () => void;
}

const PRESET_SLIPPAGES = [0.1, 0.5, 1.0];

export function SwapSettings({ slippage, onSlippageChange, onClose }: SwapSettingsProps) {
  const [customSlippage, setCustomSlippage] = React.useState<string>('');
  const [isCustom, setIsCustom] = React.useState(false);

  const handlePresetClick = (value: number) => {
    onSlippageChange(value);
    setIsCustom(false);
    setCustomSlippage('');
  };

  const handleCustomChange = (value: string) => {
    setCustomSlippage(value);
    setIsCustom(true);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 50) {
      onSlippageChange(numValue);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Transaction Settings</CardTitle>
            <CardDescription className="text-xs">
              Adjust slippage tolerance
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">Slippage Tolerance</Label>
          <div className="flex gap-2">
            {PRESET_SLIPPAGES.map((value) => (
              <Button
                key={value}
                variant={slippage === value && !isCustom ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePresetClick(value)}
                className="flex-1"
              >
                {value}%
              </Button>
            ))}
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Custom"
                value={customSlippage}
                onChange={(e) => handleCustomChange(e.target.value)}
                className="h-9"
                min="0"
                max="50"
                step="0.1"
              />
            </div>
          </div>
          {slippage > 5 && (
            <p className="text-xs text-destructive">
              High slippage tolerance. Your transaction may be frontrun.
            </p>
          )}
          {slippage < 0.1 && (
            <p className="text-xs text-destructive">
              Transaction may fail due to low slippage tolerance.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}