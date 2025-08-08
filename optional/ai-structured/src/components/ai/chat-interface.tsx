'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatInput } from './chat-input';
import { MessageBubble } from './message-bubble';
import { ModelSelector } from './model-selector';
import { ChatMessage } from '@/lib/ai/config';
import { useAI } from '@/hooks/useAI';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Download, Copy } from 'lucide-react';

interface ChatInterfaceProps {
  initialMessages?: ChatMessage[];
  systemPrompt?: string;
  showModelSelector?: boolean;
  className?: string;
}

export function ChatInterface({
  initialMessages = [],
  systemPrompt,
  showModelSelector = true,
  className = '',
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { sendMessage, currentProvider, currentModel, switchProvider, switchModel } = useAI();

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      role: 'user',
      content,
      id: Date.now().toString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsStreaming(true);

    try {
      const allMessages = systemPrompt
        ? [{ role: 'system' as const, content: systemPrompt }, ...updatedMessages]
        : updatedMessages;

      const response = await sendMessage(allMessages, {
        stream: true,
        model: currentModel,
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: '',
        id: (Date.now() + 1).toString(),
      };

      setMessages([...updatedMessages, assistantMessage]);

      if (typeof response === 'string') {
        // Non-streaming response
        assistantMessage.content = response;
        setMessages([...updatedMessages, assistantMessage]);
      } else {
        // Streaming response
        let fullContent = '';
        for await (const chunk of response) {
          fullContent += chunk;
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === 'assistant') {
              lastMessage.content = fullContent;
            }
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        id: (Date.now() + 1).toString(),
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleExportChat = () => {
    const chatContent = messages
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyChat = () => {
    const chatContent = messages
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n');
    navigator.clipboard.writeText(chatContent);
  };

  return (
    <Card className={`flex flex-col h-[600px] ${className}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">AI Chat</h2>
          {showModelSelector && (
            <ModelSelector
              currentProvider={currentProvider}
              currentModel={currentModel}
              onProviderChange={switchProvider}
              onModelChange={switchModel}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyChat}
            disabled={messages.length === 0}
            title="Copy chat"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExportChat}
            disabled={messages.length === 0}
            title="Export chat"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearChat}
            disabled={messages.length === 0}
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">AI is thinking...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isStreaming}
          placeholder={isStreaming ? 'AI is responding...' : 'Type your message...'}
        />
      </div>
    </Card>
  );
}