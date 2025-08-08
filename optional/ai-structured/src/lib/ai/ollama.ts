import { ChatMessage, ChatOptions, CompletionOptions } from './config';
import { AIProviderInterface } from './ai-service';

export class OllamaProvider implements AIProviderInterface {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.OLLAMA_HOST || 'http://localhost:11434';
  }

  async chat(
    messages: ChatMessage[],
    options?: ChatOptions
  ): Promise<AsyncIterable<string> | string> {
    const model = options?.model || 'llama3';
    
    if (options?.stream) {
      return this.streamChat(messages, model, options);
    }

    const response = await fetch(`${this.baseURL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        options: {
          temperature: options?.temperature,
          num_predict: options?.maxTokens,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message?.content || '';
  }

  private async *streamChat(
    messages: ChatMessage[],
    model: string,
    options?: ChatOptions
  ): AsyncIterable<string> {
    const response = await fetch(`${this.baseURL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        options: {
          temperature: options?.temperature,
          num_predict: options?.maxTokens,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (data.message?.content) {
            yield data.message.content;
          }
        } catch (e) {
          // Skip invalid JSON lines
        }
      }
    }
  }

  async complete(prompt: string, options?: CompletionOptions): Promise<string> {
    const response = await fetch(`${this.baseURL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: options?.model || 'llama3',
        prompt,
        stream: false,
        options: {
          temperature: options?.temperature,
          num_predict: options?.maxTokens,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || '';
  }

  countTokens(text: string): number {
    // Rough approximation for Llama models
    return Math.ceil(text.length / 4);
  }
}