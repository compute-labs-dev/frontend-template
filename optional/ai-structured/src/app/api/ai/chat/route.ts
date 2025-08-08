import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai/ai-service';
import { ChatMessage, ChatOptions } from '@/lib/ai/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, provider, model, options } = body as {
      messages: ChatMessage[];
      provider?: string;
      model?: string;
      options?: ChatOptions;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const aiService = AIService.getInstance();
    
    if (provider) {
      aiService.switchProvider(provider);
    }

    const chatOptions: ChatOptions = {
      ...options,
      model: model || options?.model,
    };

    const response = await aiService.chat(messages, chatOptions);

    // Handle streaming response
    if (chatOptions.stream && typeof response !== 'string') {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of response) {
              const data = JSON.stringify({ content: chunk });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          } catch (error) {
            controller.error(error);
          } finally {
            controller.close();
          }
        },
      });

      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Non-streaming response
    return NextResponse.json({ content: response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}