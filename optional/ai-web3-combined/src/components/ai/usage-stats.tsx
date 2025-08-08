'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, DollarSign, Zap, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UsageStats {
  monthlyBudget: number;
  monthlyUsage: number;
  remainingBudget: number;
  usagePercentage: number;
  breakdown: {
    [key: string]: {
      tokens: number;
      cost: number;
      requests: number;
    };
  };
  currentUsage: {
    dailyTokens: number;
    dailyRequests: number;
    monthlyTokens: number;
    monthlyRequests: number;
  };
  limits: {
    dailyTokenLimit: number;
    dailyRequestLimit: number;
    monthlyTokenLimit: number;
    monthlyRequestLimit: number;
  };
}

export function UsageStats() {
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsage();
    // Refresh every 30 seconds
    const interval = setInterval(fetchUsage, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUsage = async () => {
    try {
      const response = await fetch('/api/ai/usage');
      if (!response.ok) throw new Error('Failed to fetch usage');
      const data = await response.json();
      setUsage(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load usage stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!usage) return null;

  const budgetWarning = usage.usagePercentage > 80;
  const budgetCritical = usage.usagePercentage > 95;

  return (
    <div className="space-y-4">
      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Monthly Budget
          </CardTitle>
          <CardDescription>
            AI API usage and costs for the current month
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">
              ${usage.monthlyUsage.toFixed(2)}
            </span>
            <span className="text-muted-foreground">
              of ${usage.monthlyBudget.toFixed(2)}
            </span>
          </div>
          
          <Progress 
            value={usage.usagePercentage} 
            className={`h-2 ${budgetCritical ? 'bg-red-100' : budgetWarning ? 'bg-yellow-100' : ''}`}
          />
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              ${usage.remainingBudget.toFixed(2)} remaining
            </span>
            <Badge variant={budgetCritical ? 'destructive' : budgetWarning ? 'secondary' : 'default'}>
              {usage.usagePercentage.toFixed(1)}% used
            </Badge>
          </div>

          {budgetWarning && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {budgetCritical 
                  ? 'Critical: You have almost reached your monthly budget limit!'
                  : 'Warning: You have used over 80% of your monthly budget.'}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Provider Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Provider Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(usage.breakdown).map(([provider, stats]) => (
              <div key={provider} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="capitalize">
                    {provider}
                  </Badge>
                  <div className="text-sm">
                    <span className="font-medium">{stats.requests}</span>
                    <span className="text-muted-foreground"> requests</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${stats.cost.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">
                    {(stats.tokens / 1000).toFixed(1)}k tokens
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Usage Limits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Usage Limits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Daily Requests</span>
              <span>{usage.currentUsage.dailyRequests} / {usage.limits.dailyRequestLimit}</span>
            </div>
            <Progress 
              value={(usage.currentUsage.dailyRequests / usage.limits.dailyRequestLimit) * 100} 
              className="h-1"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Daily Tokens</span>
              <span>{(usage.currentUsage.dailyTokens / 1000).toFixed(1)}k / {(usage.limits.dailyTokenLimit / 1000).toFixed(0)}k</span>
            </div>
            <Progress 
              value={(usage.currentUsage.dailyTokens / usage.limits.dailyTokenLimit) * 100} 
              className="h-1"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Monthly Requests</span>
              <span>{usage.currentUsage.monthlyRequests} / {usage.limits.monthlyRequestLimit}</span>
            </div>
            <Progress 
              value={(usage.currentUsage.monthlyRequests / usage.limits.monthlyRequestLimit) * 100} 
              className="h-1"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Monthly Tokens</span>
              <span>{(usage.currentUsage.monthlyTokens / 1000).toFixed(0)}k / {(usage.limits.monthlyTokenLimit / 1000).toFixed(0)}k</span>
            </div>
            <Progress 
              value={(usage.currentUsage.monthlyTokens / usage.limits.monthlyTokenLimit) * 100} 
              className="h-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}