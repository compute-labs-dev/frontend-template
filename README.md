# create-computelabs-app

🚀 Create modern web applications with Compute Labs in seconds. Choose from three specialized templates: Standard Web2, AI-Structured, or Web3.

[![npm version](https://img.shields.io/npm/v/create-computelabs-app.svg)](https://www.npmjs.com/package/create-computelabs-app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Features

✨ **Three Specialized Templates**
- **Standard Web2**: Next.js with theming, i18n, and Redux
- **AI-Structured**: Multi-provider AI integration (OpenAI, Anthropic, Gemini, Ollama)
- **Web3**: Solana blockchain with wallet connectivity and DeFi components

🎨 **Built-in Features**
- Compute Labs branding and design system
- Light/dark mode with next-themes
- Internationalization (8 languages)
- TypeScript for type safety
- Tailwind CSS for styling
- Redux Toolkit for state management
- ESLint & Prettier configured

## Quick Start

### Using npx (recommended)

```bash
npx create-computelabs-app my-app
cd my-app
npm install
npm run dev
```

### Using npm

```bash
npm create computelabs-app@latest my-app
cd my-app
npm install
npm run dev
```

### Using yarn

```bash
yarn create computelabs-app my-app
cd my-app
yarn
yarn dev
```

The CLI will guide you through selecting and configuring your template.

## Template Options

### 🌐 Standard Web2
Perfect for traditional web applications with modern features:
- Next.js 14 with App Router
- Redux Toolkit for state management
- Internationalization ready (8 languages)
- Theme switching (light/dark mode)
- Responsive design with Tailwind CSS

### 🤖 AI-Structured
Build AI-powered applications with multiple LLM providers:
- **Providers**: OpenAI, Anthropic, Google Gemini, Ollama (local)
- **Features**: Chat interface, streaming responses, cost tracking
- **Components**: Pre-built chat UI, model selector, message handling
- **API Routes**: Ready-to-use endpoints for chat and completions
- **Demo Page**: Interactive AI playground at `/ai-demo`

### 🔗 Web3
Create blockchain applications on Solana:
- **Wallet Support**: Phantom, Backpack, OKX
- **DeFi Components**: Token swap interface with slippage control
- **Utilities**: Transaction helpers, token operations, RPC management
- **Networks**: Mainnet, Testnet, Devnet support
- **Demo Page**: Token swap interface at `/swap`

## Project Structure

```
my-app/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── lib/              # Utilities and configurations
│   ├── store/            # Redux store
│   └── assets/           # Images, fonts
├── public/               # Static files
├── .env.local           # Environment variables
└── package.json         # Dependencies
```

## Configuration

### Environment Variables

Each template generates appropriate `.env.local` and `.env.example` files:

**AI Template:**
```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AI...
OLLAMA_HOST=http://localhost:11434
```

**Web3 Template:**
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
```

## Testing

Before deploying or publishing:

```bash
# Run automated tests
node test-templates.js

# Manual testing (see TESTING.md for full guide)
node create.js test-project
cd test-project
npm install
npm run dev
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/computelabs-template.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make changes and test
node test-templates.js

# Submit a pull request
```

## Documentation

- [Testing Guide](TESTING.md) - Comprehensive testing procedures
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Architecture](CLAUDE.md) - Technical architecture for AI assistants
- [PRD](docs/enhanced_template_prd.md) - Product requirements document

## Support

- **Issues**: [GitHub Issues](https://github.com/compute-labs/computelabs-template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/compute-labs/computelabs-template/discussions)
- **Email**: support@computelabs.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Solana Labs for blockchain infrastructure
- OpenAI, Anthropic, and Google for AI capabilities
- The open-source community for invaluable contributions

---

Built with ❤️ by [Compute Labs](https://computelabs.com) 