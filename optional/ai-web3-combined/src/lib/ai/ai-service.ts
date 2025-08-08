import { ChatMessage, ChatOptions, CompletionOptions, AI_PROVIDERS, TOKEN_COSTS } from './config';
import { OpenAIProvider } from './openai';
import { AnthropicProvider } from './anthropic';
import { GeminiProvider } from './gemini';
import { OllamaProvider } from './ollama';

export interface AIProviderInterface {
  chat(messages: ChatMessage[], options?: ChatOptions): Promise<AsyncIterable<string> | string>;
  complete(prompt: string, options?: CompletionOptions): Promise<string>;
  countTokens(text: string): number;
}

export class AIService {
  private static instance: AIService;
  private provider: AIProviderInterface;
  private currentProviderName: string;
  private monthlyBudget: number;
  private monthlyUsage: number = 0;
  private enableCostOptimization: boolean;

  private constructor() {
    this.currentProviderName = process.env.DEFAULT_AI_PROVIDER || 'openai';
    this.monthlyBudget = parseFloat(process.env.MONTHLY_AI_BUDGET_USD || '100');
    this.enableCostOptimization = process.env.ENABLE_COST_OPTIMIZATION === 'true';
    this.provider = this.createProvider(this.currentProviderName);
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  private createProvider(providerName: string): AIProviderInterface {
    switch (providerName) {
      case 'openai':
        return new OpenAIProvider();
      case 'anthropic':
        return new AnthropicProvider();
      case 'gemini':
        return new GeminiProvider();
      case 'ollama':
        return new OllamaProvider();
      default:
        throw new Error(`Unknown provider: ${providerName}`);
    }
  }

  public async chat(
    messages: ChatMessage[],
    options?: ChatOptions
  ): Promise<AsyncIterable<string> | string> {
    // Cost optimization: select cheaper model if budget is tight
    if (this.enableCostOptimization && options?.model) {
      options.model = this.optimizeModelSelection(options.model);
    }

    try {
      const response = await this.provider.chat(messages, options);
      
      // Track usage if streaming
      if (options?.stream && typeof response !== 'string') {
        return this.trackStreamingUsage(response, options?.model);
      }
      
      // Track usage for non-streaming
      if (typeof response === 'string') {
        this.trackUsage(response, options?.model);
      }
      
      return response;
    } catch (error) {
      console.error(`Error with ${this.currentProviderName}:`, error);
      // Fallback to a different provider if available
      return this.fallbackChat(messages, options);
    }
  }

  public async complete(prompt: string, options?: CompletionOptions): Promise<string> {
    if (this.enableCostOptimization && options?.model) {
      options.model = this.optimizeModelSelection(options.model);
    }

    try {
      const response = await this.provider.complete(prompt, options);
      this.trackUsage(response, options?.model);
      return response;
    } catch (error) {
      console.error(`Error with ${this.currentProviderName}:`, error);
      return this.fallbackComplete(prompt, options);
    }
  }

  public switchProvider(providerName: string): void {
    if (!AI_PROVIDERS[providerName]) {
      throw new Error(`Unknown provider: ${providerName}`);
    }
    this.currentProviderName = providerName;
    this.provider = this.createProvider(providerName);
  }

  public estimateCost(text: string, model?: string): number {
    const tokens = this.provider.countTokens(text);
    const modelName = model || this.getDefaultModel();
    const costs = TOKEN_COSTS[modelName as keyof typeof TOKEN_COSTS];
    
    if (!costs) {
      return 0;
    }
    
    // Rough estimate: assume 50/50 input/output
    return (tokens / 1000) * ((costs.input + costs.output) / 2);
  }

  public getRemainingBudget(): number {
    return Math.max(0, this.monthlyBudget - this.monthlyUsage);
  }

  public getUsagePercentage(): number {
    return (this.monthlyUsage / this.monthlyBudget) * 100;
  }

  private optimizeModelSelection(requestedModel: string): string {
    const remainingBudget = this.getRemainingBudget();
    const usagePercentage = this.getUsagePercentage();
    
    // If we've used more than 80% of budget, switch to cheaper models
    if (usagePercentage > 80) {
      if (requestedModel.includes('gpt-4')) {
        return 'gpt-3.5-turbo';
      }
      if (requestedModel.includes('claude-3-opus')) {
        return 'claude-3-haiku-20240307';
      }
      if (requestedModel.includes('gemini-1.5-pro')) {
        return 'gemini-1.5-flash';
      }
    }
    
    return requestedModel;
  }

  private async trackStreamingUsage(
    stream: AsyncIterable<string>,
    model?: string
  ): AsyncIterable<string> {
    let fullContent = '';
    
    async function* trackedStream(this: AIService) {
      for await (const chunk of stream) {
        fullContent += chunk;
        yield chunk;
      }
      // Track usage after streaming completes
      this.trackUsage(fullContent, model);
    }
    
    return trackedStream.call(this);
  }

  private trackUsage(text: string, model?: string): void {
    const cost = this.estimateCost(text, model);
    this.monthlyUsage += cost;
    
    // Log warning if approaching budget limit
    if (this.getUsagePercentage() > 90) {
      console.warn(`AI usage at ${this.getUsagePercentage().toFixed(1)}% of monthly budget`);
    }
  }

  private getDefaultModel(): string {
    const provider = AI_PROVIDERS[this.currentProviderName];
    return provider.models[0];
  }

  private async fallbackChat(
    messages: ChatMessage[],
    options?: ChatOptions
  ): Promise<string> {
    // Try Ollama as fallback (local, no cost)
    if (this.currentProviderName !== 'ollama') {
      console.log('Falling back to Ollama...');
      this.switchProvider('ollama');
      const response = await this.provider.chat(messages, options);
      return typeof response === 'string' ? response : this.streamToString(response);
    }
    throw new Error('All AI providers failed');
  }

  private async fallbackComplete(
    prompt: string,
    options?: CompletionOptions
  ): Promise<string> {
    if (this.currentProviderName !== 'ollama') {
      console.log('Falling back to Ollama...');
      this.switchProvider('ollama');
      return this.provider.complete(prompt, options);
    }
    throw new Error('All AI providers failed');
  }

  private async streamToString(stream: AsyncIterable<string>): Promise<string> {
    let result = '';
    for await (const chunk of stream) {
      result += chunk;
    }
    return result;
  }
}