'use client';

import React from 'react';
import { ChatInterface } from '@/components/ai/chat-interface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const examplePrompts = [
  "Explain quantum computing in simple terms",
  "Write a haiku about programming",
  "What are the benefits of TypeScript?",
  "How do I center a div in CSS?",
];

export default function AIDemoPage() {
  const systemPrompt = "You are a helpful AI assistant integrated into a Compute Labs application. You provide clear, concise, and accurate responses.";

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI Integration Demo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of multiple AI providers in your application. Switch between OpenAI, Anthropic, Google Gemini, and local Ollama models seamlessly.
          </p>
        </div>

        {/* Configuration Alert */}
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            <strong>Setup Required:</strong> Add your API keys to the <code className="px-1 py-0.5 bg-muted rounded text-sm">.env.local</code> file to use AI providers. 
            Ollama works locally without API keys.
          </AlertDescription>
        </Alert>

        {/* Main Content */}
        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Chat Interface</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <ChatInterface
              systemPrompt={systemPrompt}
              showModelSelector={true}
              className="h-[700px]"
            />
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Example Prompts</CardTitle>
                <CardDescription>
                  Try these prompts to see the AI in action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {examplePrompts.map((prompt, index) => (
                    <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <p className="text-sm">{prompt}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
                <CardDescription>
                  Common applications for AI integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Customer Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Provide instant, intelligent responses to customer queries
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Content Generation</h4>
                  <p className="text-sm text-muted-foreground">
                    Generate blog posts, product descriptions, and marketing copy
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Code Assistance</h4>
                  <p className="text-sm text-muted-foreground">
                    Help developers with code suggestions and debugging
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Data Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Analyze and summarize complex data sets
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    OpenAI
                    <Badge className="bg-green-500/10 text-green-500">Popular</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Access GPT-4, GPT-3.5 Turbo, and other OpenAI models
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">GPT-4 Turbo</Badge>
                    <Badge variant="outline">GPT-3.5 Turbo</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Anthropic
                    <Badge className="bg-orange-500/10 text-orange-500">Advanced</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Use Claude 3 models for nuanced, safe AI interactions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Claude 3 Opus</Badge>
                    <Badge variant="outline">Claude 3 Sonnet</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Google Gemini
                    <Badge className="bg-blue-500/10 text-blue-500">Multimodal</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Google's latest AI models with multimodal capabilities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Gemini 1.5 Pro</Badge>
                    <Badge variant="outline">Gemini 1.5 Flash</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Ollama
                    <Badge className="bg-purple-500/10 text-purple-500">Local</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Run AI models locally for privacy and no API costs
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Llama 3</Badge>
                    <Badge variant="outline">Mistral</Badge>
                    <Badge variant="outline">CodeLlama</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization</CardTitle>
                <CardDescription>
                  Smart model selection based on your budget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The AI service automatically switches to more cost-effective models when your monthly budget usage exceeds 80%. 
                  This ensures you never exceed your spending limits while maintaining service availability.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}