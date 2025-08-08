import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatMessage, ChatOptions, CompletionOptions } from './config';
import { AIProviderInterface } from './ai-service';

export class GeminiProvider implements AIProviderInterface {
  private genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_API_KEY is not set');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async chat(
    messages: ChatMessage[],
    options?: ChatOptions
  ): Promise<AsyncIterable<string> | string> {
    const model = this.genAI.getGenerativeModel({ 
      model: options?.model || 'gemini-1.5-flash' 
    });

    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    
    if (options?.stream) {
      return this.streamChat(model, history, lastMessage.content, options);
    }

    const chat = model.startChat({
      history,
      generationConfig: {
        temperature: options?.temperature,
        maxOutputTokens: options?.maxTokens,
      },
    });

    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    return response.text();
  }

  private async *streamChat(
    model: any,
    history: any[],
    message: string,
    options?: ChatOptions
  ): AsyncIterable<string> {
    const chat = model.startChat({
      history,
      generationConfig: {
        temperature: options?.temperature,
        maxOutputTokens: options?.maxTokens,
      },
    });

    const result = await chat.sendMessageStream(message);
    
    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        yield text;
      }
    }
  }

  async complete(prompt: string, options?: CompletionOptions): Promise<string> {
    const model = this.genAI.getGenerativeModel({ 
      model: options?.model || 'gemini-1.5-flash' 
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: options?.temperature,
        maxOutputTokens: options?.maxTokens,
      },
    });

    const response = await result.response;
    return response.text();
  }

  countTokens(text: string): number {
    // Rough approximation for Gemini models
    return Math.ceil(text.length / 4);
  }
}