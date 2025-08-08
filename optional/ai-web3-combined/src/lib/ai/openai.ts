import OpenAI from 'openai';
import { ChatMessage, ChatOptions, CompletionOptions } from './config';
import { AIProviderInterface } from './ai-service';

export class OpenAIProvider implements AIProviderInterface {
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    this.client = new OpenAI({ apiKey });
  }

  async chat(
    messages: ChatMessage[],
    options?: ChatOptions
  ): Promise<AsyncIterable<string> | string> {
    const model = options?.model || 'gpt-3.5-turbo';
    
    if (options?.stream) {
      return this.streamChat(messages, model, options);
    }

    const response = await this.client.chat.completions.create({
      model,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: options?.temperature,
      max_tokens: options?.maxTokens,
    });

    return response.choices[0]?.message?.content || '';
  }

  private async *streamChat(
    messages: ChatMessage[],
    model: string,
    options?: ChatOptions
  ): AsyncIterable<string> {
    const stream = await this.client.chat.completions.create({
      model,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: options?.temperature,
      max_tokens: options?.maxTokens,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  }

  async complete(prompt: string, options?: CompletionOptions): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: options?.model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: options?.temperature,
      max_tokens: options?.maxTokens,
    });

    return response.choices[0]?.message?.content || '';
  }

  countTokens(text: string): number {
    // Rough approximation: 1 token ≈ 4 characters for English text
    return Math.ceil(text.length / 4);
  }
}