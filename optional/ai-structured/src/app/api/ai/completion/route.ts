import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai/ai-service';
import { CompletionOptions } from '@/lib/ai/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, provider, model, options } = body as {
      prompt: string;
      provider?: string;
      model?: string;
      options?: CompletionOptions;
    };

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt string is required' },
        { status: 400 }
      );
    }

    const aiService = AIService.getInstance();
    
    if (provider) {
      aiService.switchProvider(provider);
    }

    const completionOptions: CompletionOptions = {
      ...options,
      model: model || options?.model,
    };

    const response = await aiService.complete(prompt, completionOptions);

    return NextResponse.json({ content: response });
  } catch (error) {
    console.error('Completion API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}