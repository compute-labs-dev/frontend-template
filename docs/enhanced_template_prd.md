# Enhanced Compute Labs Template System - Product Requirements Document

## Executive Summary

Transform the existing Compute Labs template CLI into a comprehensive project scaffolding tool that offers three distinct project types: Standard Web2, AI-Structured, and Web3. This enhancement will enable developers to quickly bootstrap production-ready applications with appropriate technology stacks while maintaining consistent Compute Labs branding and best practices.

## Goals

### Primary Goals
- **Diversify Template Options**: Provide three distinct, production-ready project templates
- **Accelerate Development**: Reduce project setup time from days to minutes for AI and Web3 projects
- **Maintain Consistency**: Ensure all templates follow Compute Labs standards and branding

### Secondary Goals
- **Developer Experience**: Create an intuitive, guided CLI experience
- **Modularity**: Enable easy maintenance and updates of individual template components
- **Documentation**: Provide comprehensive documentation for each template type

### Success Metrics
- **Setup Time**: < 5 minutes from CLI execution to running development server
- **Template Adoption**: 80% of new projects use one of the three templates
- **Developer Satisfaction**: > 4.5/5 rating in internal surveys
- **Error Rate**: < 2% installation failure rate

## User Stories

### As a Developer
- I want to choose between Web2, AI, or Web3 project types during setup
- I want pre-configured AI providers (OpenAI, Anthropic, Gemini, Ollama) ready to use
- I want Web3 wallet connectivity and DeFi components out of the box
- I want consistent branding and theming across all template types

### As a Team Lead
- I want standardized project structures across different technology stacks
- I want to ensure security best practices are followed (API key management, wallet security)
- I want teams to focus on business logic rather than boilerplate setup

### As a Product Manager
- I want rapid prototyping capabilities for AI and Web3 features
- I want consistent user experience across all Compute Labs products
- I want to reduce time-to-market for new initiatives

## Technical Requirements

### 1. Enhanced CLI System

#### Project Type Selection
```
🚀 Compute Labs Project Template

? Select your project type: (Use arrow keys)
❯ Standard Web2 - Next.js app with theming and i18n
  AI-Structured - AI-powered app with multiple LLM providers
  Web3 - Blockchain app with Solana wallet integration

? Project name: my-awesome-app
? Project description: A new Compute Labs project
? Author name: John Doe
```

#### Template-Specific Options

**For AI-Structured:**
```
? Select AI providers to include: (Press <space> to select)
◉ OpenAI
◯ Anthropic
◯ Google Gemini
◯ Ollama (local models)

? Include example components? (Y/n)
```

**For Web3:**
```
? Select blockchain network:
❯ Solana Mainnet
  Solana Devnet
  Solana Testnet

? Include DeFi components? (Y/n)
```

### 2. Template Structures

#### Base Structure (All Templates)
```
project-root/
├── src/
│   ├── app/[locale]/        # i18n routing
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── layouts/         # Header, Footer
│   │   └── ui/              # UI primitives
│   ├── lib/                 # Utilities
│   ├── store/               # Redux store
│   └── assets/              # Images, fonts
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

#### AI-Structured Additions
```
optional/ai-structured/
├── src/
│   ├── providers/
│   │   └── ai-provider.tsx      # Unified AI provider context
│   ├── lib/
│   │   └── ai/
│   │       ├── config.ts        # Provider configurations
│   │       ├── openai.ts        # OpenAI integration
│   │       ├── anthropic.ts     # Anthropic integration
│   │       ├── gemini.ts        # Google Gemini integration
│   │       ├── ollama.ts        # Ollama integration
│   │       ├── cost-optimizer.ts # Model selection optimization
│   │       └── types.ts         # TypeScript definitions
│   ├── components/
│   │   └── ai/
│   │       ├── chat-interface.tsx    # Complete chat UI
│   │       ├── chat-input.tsx        # Message input component
│   │       ├── message-bubble.tsx    # Message display
│   │       ├── model-selector.tsx    # Provider/model selection
│   │       ├── stream-handler.tsx    # Response streaming
│   │       └── token-counter.tsx     # Usage tracking
│   ├── app/
│   │   ├── api/
│   │   │   └── ai/
│   │   │       ├── chat/route.ts     # Chat endpoint
│   │   │       └── completion/route.ts # Completion endpoint
│   │   └── [locale]/
│   │       └── ai-demo/
│   │           └── page.tsx          # Demo page
│   └── hooks/
│       ├── useAI.ts              # AI interaction hook
│       └── useStreaming.ts      # Streaming response hook
├── .env.example                  # API key templates
└── package.json.snippet          # AI-specific dependencies
```

#### Web3 Additions (Enhanced)
```
optional/web3-solana-starter/
├── src/
│   ├── providers/
│   │   └── app-wallet-provider.tsx   # Wallet connection provider
│   ├── lib/
│   │   ├── app-wallets.ts           # Wallet configurations
│   │   └── solana/
│   │       ├── connection.ts        # RPC connection setup
│   │       ├── transactions.ts      # Transaction utilities
│   │       └── tokens.ts            # Token operations
│   ├── components/
│   │   ├── wallet/
│   │   │   ├── wallet-popover.tsx   # Wallet UI
│   │   │   ├── wallet-connect.tsx   # Connection flow
│   │   │   └── wallet-actions.tsx   # Connected actions
│   │   └── defi/
│   │       ├── token-swap.tsx       # Token swap component
│   │       ├── token-selector.tsx   # Token selection UI
│   │       ├── swap-settings.tsx    # Slippage, etc.
│   │       └── balance-display.tsx  # Token balances
│   ├── app/
│   │   └── [locale]/
│   │       └── swap/
│   │           └── page.tsx         # Swap interface page
│   └── hooks/
│       ├── useTokenBalance.ts       # Balance fetching
│       └── useSwap.ts              # Swap execution
├── .env.example                     # RPC endpoints
└── package.json.snippet            # Web3 dependencies
```

### 3. Dependencies by Template Type

#### Standard Web2 (Base)
```json
{
  "dependencies": {
    "next": "14.2.4",
    "react": "^18",
    "react-dom": "^18",
    "@reduxjs/toolkit": "^2.3.0",
    "react-redux": "^9.1.2",
    "next-intl": "^3.15.0",
    "next-themes": "^0.3.0",
    "tailwindcss": "^3.4.1",
    "@radix-ui/*": "latest",
    "framer-motion": "^12.16.0"
  }
}
```

#### AI-Structured (Additional)
```json
{
  "dependencies": {
    "@ai-sdk/openai": "^0.0.66",
    "@ai-sdk/anthropic": "^0.0.51",
    "@ai-sdk/google": "^0.0.52",
    "ollama-ai-provider": "^0.15.2",
    "ai": "^3.4.9",
    "openai": "^4.67.1",
    "@anthropic-ai/sdk": "^0.27.3",
    "@google/generative-ai": "^0.21.0",
    "zod": "^3.23.8",
    "nanoid": "^5.0.7"
  }
}
```

#### Web3 (Additional)
```json
{
  "dependencies": {
    "@solana/web3.js": "^1.95.4",
    "@solana/wallet-adapter-react": "^0.15.35",
    "@solana/wallet-adapter-react-ui": "^0.9.35",
    "@solana/wallet-adapter-wallets": "^0.19.32",
    "@solana/spl-token": "^0.4.9",
    "@coral-xyz/anchor": "^0.31.1",
    "@tanstack/react-query": "^5.80.3",
    "bs58": "^6.0.0"
  }
}
```

### 4. AI Provider Integration

#### Provider Configuration
```typescript
// lib/ai/config.ts
export const AI_PROVIDERS = {
  openai: {
    name: 'OpenAI',
    models: ['gpt-4-turbo', 'gpt-3.5-turbo'],
    apiKeyEnv: 'OPENAI_API_KEY'
  },
  anthropic: {
    name: 'Anthropic',
    models: ['claude-3-opus', 'claude-3-sonnet'],
    apiKeyEnv: 'ANTHROPIC_API_KEY'
  },
  gemini: {
    name: 'Google Gemini',
    models: ['gemini-1.5-pro', 'gemini-1.5-flash'],
    apiKeyEnv: 'GOOGLE_API_KEY'
  },
  ollama: {
    name: 'Ollama',
    models: ['llama3', 'mistral', 'codellama'],
    apiKeyEnv: null // Local models
  }
};
```

#### Unified AI Service
```typescript
// lib/ai/ai-service.ts
export class AIService {
  private provider: AIProvider;
  
  async chat(messages: Message[], options?: ChatOptions): Promise<Response>;
  async complete(prompt: string, options?: CompletionOptions): Promise<string>;
  switchProvider(provider: string): void;
  estimateCost(tokens: number): number;
}
```

### 5. Web3 Token Swap Component

#### Component Requirements
- Support major Solana tokens (SOL, USDC, custom SPL tokens)
- Real-time price fetching from DEX
- Slippage tolerance configuration
- Transaction preview and confirmation
- Error handling and retry logic

#### Example Implementation
```typescript
// components/defi/token-swap.tsx
interface TokenSwapProps {
  defaultFromToken?: string;
  defaultToToken?: string;
  onSwapComplete?: (txHash: string) => void;
}

export function TokenSwap({ 
  defaultFromToken = 'SOL',
  defaultToToken = 'USDC',
  onSwapComplete 
}: TokenSwapProps) {
  // Implementation with Jupiter aggregator or similar
}
```

### 6. CLI Implementation Updates

#### Enhanced create.js Flow
```javascript
// create.js
async function main() {
  // 1. Display welcome banner with ASCII art
  displayWelcomeBanner();
  
  // 2. Project type selection
  const { projectType } = await promptProjectType();
  
  // 3. Common questions
  const commonAnswers = await promptCommonQuestions();
  
  // 4. Type-specific questions
  const typeSpecificAnswers = await promptTypeSpecific(projectType);
  
  // 5. Create project structure
  await createProjectStructure(projectType, {...commonAnswers, ...typeSpecificAnswers});
  
  // 6. Install dependencies
  await installDependencies(projectType, typeSpecificAnswers);
  
  // 7. Initialize git
  await initializeGit();
  
  // 8. Display success message with next steps
  displaySuccessMessage(projectType);
}
```

### 7. Environment Configuration

#### AI-Structured .env.example
```bash
# AI Provider API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AI...
OLLAMA_HOST=http://localhost:11434

# Model Selection
DEFAULT_AI_PROVIDER=openai
DEFAULT_MODEL=gpt-4-turbo

# Cost Management
MONTHLY_AI_BUDGET_USD=100
ENABLE_COST_OPTIMIZATION=true
```

#### Web3 .env.example
```bash
# Solana Network
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com

# Optional: Custom RPC
# NEXT_PUBLIC_CUSTOM_RPC=https://your-rpc-endpoint.com

# DEX Integration (for token swap)
NEXT_PUBLIC_JUPITER_API=https://quote-api.jup.ag/v6
```

### 8. Documentation Requirements

#### Per-Template README Sections
1. **Quick Start Guide** - Get running in < 2 minutes
2. **Architecture Overview** - Understand the structure
3. **Configuration Guide** - Environment variables and settings
4. **Component Documentation** - How to use provided components
5. **Best Practices** - Security, performance, scalability
6. **Troubleshooting** - Common issues and solutions

#### AI-Specific Documentation
- Provider comparison table (cost, capabilities, rate limits)
- Prompt engineering guidelines
- Streaming implementation guide
- Cost optimization strategies

#### Web3-Specific Documentation
- Wallet integration guide
- Network configuration
- Transaction handling best practices
- Security considerations

### 9. Testing Requirements

#### Unit Tests
- Template file copying and variable replacement
- Dependency installation based on selections
- AI provider switching and fallback logic
- Wallet connection and transaction signing

#### Integration Tests
- Complete CLI flow for each template type
- AI chat functionality with mock providers
- Token swap simulation on testnet
- Cross-platform compatibility (Windows, macOS, Linux)

#### E2E Test Scenarios
1. Create Standard Web2 project → Run dev server → Verify theming
2. Create AI project → Configure providers → Send chat message
3. Create Web3 project → Connect wallet → Execute token swap

### 10. Security Considerations

#### AI Template Security
- API keys stored in environment variables only
- Rate limiting implementation examples
- Input sanitization for AI prompts
- Cost monitoring and alerts

#### Web3 Template Security
- Wallet connection best practices
- Transaction simulation before execution
- Slippage protection defaults
- Audit recommendations for smart contracts

### 11. Performance Requirements

- **CLI Execution**: < 30 seconds for file operations
- **Dependency Installation**: Parallel installation where possible
- **AI Response Time**: < 2 seconds for first token (streaming)
- **Web3 Transactions**: < 5 seconds for confirmation on devnet

### 12. Maintenance and Updates

#### Version Control Strategy
- Semantic versioning for template releases
- Backward compatibility for at least 2 major versions
- Automated testing on template updates

#### Update Mechanism
```bash
# Future enhancement
npx create-computelabs-app --update-templates
```

## Implementation Phases

### Phase 1: CLI Enhancement (Week 1)
- [ ] Refactor create.js for multi-template support
- [ ] Implement project type selection UI
- [ ] Add template-specific prompts
- [ ] Update file copying logic

### Phase 2: AI Template (Week 2-3)
- [ ] Create AI provider architecture
- [ ] Implement chat components
- [ ] Add API routes
- [ ] Create demo pages
- [ ] Write documentation

### Phase 3: Web3 Enhancement (Week 2-3)
- [ ] Add token swap component
- [ ] Improve wallet integration
- [ ] Create DeFi utilities
- [ ] Add example pages
- [ ] Security review

### Phase 4: Testing & Documentation (Week 4)
- [ ] Comprehensive testing
- [ ] Documentation completion
- [ ] Performance optimization
- [ ] User acceptance testing

### Phase 5: Launch (Week 5)
- [ ] Internal release
- [ ] Gather feedback
- [ ] Bug fixes
- [ ] Public release

## Acceptance Criteria

1. **CLI Functionality**
   - [ ] User can select between three project types
   - [ ] Type-specific options are presented appropriately
   - [ ] Projects are created with correct structure

2. **Standard Web2 Template**
   - [ ] Maintains all current functionality
   - [ ] Theming and i18n work correctly
   - [ ] Redux store is properly configured

3. **AI-Structured Template**
   - [ ] All selected AI providers are functional
   - [ ] Chat interface works with streaming
   - [ ] Cost optimization is implemented
   - [ ] Demo page showcases capabilities

4. **Web3 Template**
   - [ ] Wallet connection works for major wallets
   - [ ] Token swap component is functional
   - [ ] Transactions execute on testnet
   - [ ] Security best practices are followed

5. **Documentation**
   - [ ] Each template has comprehensive README
   - [ ] API documentation is complete
   - [ ] Security guidelines are provided
   - [ ] Troubleshooting guide is available

6. **Performance**
   - [ ] Setup completes in < 5 minutes
   - [ ] All templates run without errors
   - [ ] Build and deployment work correctly

## Success Metrics

- **Adoption**: 80% of new projects use the enhanced templates within 3 months
- **Setup Time**: Average < 3 minutes from start to running dev server
- **Error Rate**: < 2% installation failures
- **Developer Satisfaction**: > 4.5/5 in surveys
- **Support Tickets**: < 5 template-related issues per month

## Risk Mitigation

| Risk | Impact | Mitigation Strategy |
|------|--------|-------------------|
| AI API costs | High | Implement cost controls, provide Ollama option |
| Dependency conflicts | Medium | Lock versions, test combinations |
| Security vulnerabilities | High | Regular audits, security best practices |
| Template maintenance burden | Medium | Modular architecture, automated testing |
| Cross-platform issues | Low | CI/CD testing on all platforms |

## Future Enhancements

### Phase 2 (Q2 2025)
- Web-based template configurator
- Template marketplace for community contributions
- Automated dependency updates
- CI/CD pipeline templates

### Phase 3 (Q3 2025)
- Mobile app templates (React Native)
- Backend service templates (Node.js, Python)
- Microservices architecture template
- GraphQL API template

## Appendix

### A. Template Comparison Matrix

| Feature | Standard Web2 | AI-Structured | Web3 |
|---------|--------------|---------------|------|
| Next.js 14 | ✅ | ✅ | ✅ |
| TypeScript | ✅ | ✅ | ✅ |
| Tailwind CSS | ✅ | ✅ | ✅ |
| i18n | ✅ | ✅ | ✅ |
| Redux | ✅ | ✅ | ✅ |
| AI Providers | ❌ | ✅ | ❌ |
| Wallet Connect | ❌ | ❌ | ✅ |
| DeFi Components | ❌ | ❌ | ✅ |
| Setup Time | 2 min | 3 min | 3 min |

### B. Cost Estimation

- **Development**: 160 hours (4 weeks × 40 hours)
- **Testing**: 40 hours
- **Documentation**: 20 hours
- **Total**: 220 hours

### C. References

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Solana Web3.js](https://docs.solana.com/developing/clients/javascript-api)
- [Compute Labs Design System](internal-link)

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Author**: Compute Labs Engineering Team
**Status**: In Review