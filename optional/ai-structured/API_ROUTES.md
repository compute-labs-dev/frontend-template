# AI Template API Routes Documentation

## Overview

The AI template provides three main API routes for different AI operations:

## 1. `/api/ai/chat` - Chat Completions

**Purpose**: For conversational AI interactions with message history and context.

**Use Cases**:
- Chatbots and virtual assistants
- Customer support systems
- Interactive Q&A interfaces
- Multi-turn conversations

**Request Example**:
```javascript
const response = await fetch('/api/ai/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'system', content: 'You are a helpful assistant' },
      { role: 'user', content: 'Hello!' }
    ],
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    options: {
      stream: true,
      temperature: 0.7,
      max_tokens: 1000
    }
  })
});
```

## 2. `/api/ai/completion` - Text Completions

**Purpose**: For single-prompt text generation without conversation context.

**Use Cases**:
- Code completion and generation
- Text summarization
- Content generation (blog posts, product descriptions)
- Translation
- Text transformation (formatting, style changes)
- Single-shot questions without conversation history

**Key Differences from Chat**:
- No message history or context
- More suitable for standalone tasks
- Often faster for single operations
- Better for batch processing

**Request Example**:
```javascript
const response = await fetch('/api/ai/completion', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Write a function to calculate fibonacci numbers in JavaScript',
    provider: 'openai',
    model: 'gpt-3.5-turbo',
    options: {
      temperature: 0.2,  // Lower temperature for code generation
      max_tokens: 500
    }
  })
});
```

## 3. `/api/ai/usage` - Usage Tracking

**Purpose**: Monitor API usage, costs, and limits across all AI providers.

**Features**:
- Track monthly budget and spending
- Monitor token usage per provider
- View request counts and limits
- Historical usage data
- Budget alerts and warnings

**GET Request** - Fetch current usage:
```javascript
const response = await fetch('/api/ai/usage');
const stats = await response.json();
// Returns: budget info, provider breakdown, limits, current usage
```

**POST Request** - Track new usage:
```javascript
const response = await fetch('/api/ai/usage', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    provider: 'openai',
    model: 'gpt-4',
    tokens: 1500,
    cost: 0.045
  })
});
```

## When to Use Each Route

### Use `/api/ai/chat` when:
- Building a chatbot or assistant
- Need conversation history
- Want context-aware responses
- Building multi-turn interactions

### Use `/api/ai/completion` when:
- Generating standalone content
- Processing batch operations
- Need simple text transformations
- Don't need conversation context
- Want faster single-shot responses

### Use `/api/ai/usage` when:
- Displaying usage dashboards
- Monitoring costs
- Implementing usage limits
- Generating billing reports

## Provider Support

All routes support these providers:
- **OpenAI**: GPT-4, GPT-3.5 Turbo
- **Anthropic**: Claude 3 Opus, Claude 3 Sonnet
- **Google**: Gemini 1.5 Pro, Gemini 1.5 Flash
- **Ollama**: Llama 3, Mistral, CodeLlama (local, no API costs)

## Cost Optimization

The AI service includes automatic cost optimization:
- Switches to cheaper models when budget usage > 80%
- Automatic failover to alternative providers
- Local Ollama fallback for zero-cost operation
- Token usage tracking and limits

## Error Handling

All routes include comprehensive error handling:
- Provider-specific error messages
- Automatic retry with exponential backoff
- Fallback to alternative providers
- Detailed error logging

## Rate Limiting

Default limits (configurable):
- 500 requests per day
- 100,000 tokens per day
- 15,000 requests per month
- 3,000,000 tokens per month

## Security

- API keys stored in environment variables
- Request validation and sanitization
- User authentication (implement as needed)
- Input/output filtering for safety