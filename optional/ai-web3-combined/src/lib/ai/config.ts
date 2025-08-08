export interface AIProvider {
  name: string;
  models: string[];
  apiKeyEnv?: string;
  baseURL?: string;
}

export const AI_PROVIDERS: Record<string, AIProvider> = {
  openai: {
    name: 'OpenAI',
    models: ['gpt-4-turbo-preview', 'gpt-4', 'gpt-3.5-turbo'],
    apiKeyEnv: 'OPENAI_API_KEY',
  },
  anthropic: {
    name: 'Anthropic',
    models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
    apiKeyEnv: 'ANTHROPIC_API_KEY',
  },
  gemini: {
    name: 'Google Gemini',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-pro'],
    apiKeyEnv: 'GOOGLE_API_KEY',
  },
  ollama: {
    name: 'Ollama',
    models: ['llama3', 'mistral', 'codellama', 'phi'],
    baseURL: process.env.OLLAMA_HOST || 'http://localhost:11434',
  },
};

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  id?: string;
}

export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface CompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export const DEFAULT_CHAT_OPTIONS: ChatOptions = {
  temperature: 0.7,
  maxTokens: 2048,
  stream: true,
};

export const DEFAULT_COMPLETION_OPTIONS: CompletionOptions = {
  temperature: 0.7,
  maxTokens: 1024,
};

// Cost per 1000 tokens (rough estimates)
export const TOKEN_COSTS = {
  'gpt-4-turbo-preview': { input: 0.01, output: 0.03 },
  'gpt-4': { input: 0.03, output: 0.06 },
  'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
  'claude-3-opus-20240229': { input: 0.015, output: 0.075 },
  'claude-3-sonnet-20240229': { input: 0.003, output: 0.015 },
  'claude-3-haiku-20240307': { input: 0.00025, output: 0.00125 },
  'gemini-1.5-pro': { input: 0.0035, output: 0.0105 },
  'gemini-1.5-flash': { input: 0.00035, output: 0.00105 },
  'gemini-pro': { input: 0.0005, output: 0.0015 },
};