import Anthropic from '@anthropic-ai/sdk';
import { ChatMessage, ChatOptions, CompletionOptions } from './config';
import { AIProviderInterface } from './ai-service';

export class AnthropicProvider implements AIProviderInterface {
  private client: Anthropic;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not set');
    }
    this.client = new Anthropic({ apiKey });
  }

  async chat(
    messages: ChatMessage[],
    options?: ChatOptions
  ): Promise<AsyncIterable<string> | string> {
    const model = options?.model || 'claude-3-sonnet-20240229';
    
    // Extract system message if present
    const systemMessage = messages.find(m => m.role === 'system')?.content;
    const conversationMessages = messages.filter(m => m.role !== 'system');
    
    if (options?.stream) {
      return this.streamChat(conversationMessages, model, systemMessage, options);
    }

    const response = await this.client.messages.create({
      model,
      max_tokens: options?.maxTokens || 2048,
      temperature: options?.temperature,
      system: systemMessage,
      messages: conversationMessages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  private async *streamChat(
    messages: ChatMessage[],
    model: string,
    systemMessage?: string,
    options?: ChatOptions
  ): AsyncIterable<string> {
    const stream = await this.client.messages.create({
      model,
      max_tokens: options?.maxTokens || 2048,
      temperature: options?.temperature,
      system: systemMessage,
      messages: messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      stream: true,
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        yield chunk.delta.text;
      }
    }
  }

  async complete(prompt: string, options?: CompletionOptions): Promise<string> {
    const response = await this.client.messages.create({
      model: options?.model || 'claude-3-sonnet-20240229',
      max_tokens: options?.maxTokens || 1024,
      temperature: options?.temperature,
      messages: [{ role: 'user', content: prompt }],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  }

  countTokens(text: string): number {
    // Rough approximation for Claude models
    return Math.ceil(text.length / 3.5);
  }
}