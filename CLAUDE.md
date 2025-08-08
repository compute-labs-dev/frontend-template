# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an enhanced project template CLI tool for creating Compute Labs applications. It offers three distinct project types:
1. **Standard Web2** - Next.js with theming, i18n, and Redux
2. **AI-Structured** - Multi-provider AI integration (OpenAI, Anthropic, Gemini, Ollama)
3. **Web3** - Solana blockchain with wallet connectivity and DeFi components

## Key Commands

### CLI Tool (Root Level)
- `node create.js <project-name>` - Create a new project using the template
- `npm test` - No tests implemented currently

### Generated Projects
Once a project is created from the template, it will have these commands:
- `npm run dev` - Start Next.js development server
- `npm run build` - Build production application  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Architecture

### CLI Structure
- `create.js` - Enhanced CLI script with project type selection and template-specific prompts
- `package.json` - CLI dependencies (inquirer, fs-extra, chalk, ora, etc.)
- `base/` - Core Next.js template with TypeScript, Tailwind, i18n
- `optional/`
  - `ai-structured/` - AI provider integrations and chat components
  - `web3-solana-starter/` - Web3 integration with wallet adapters and DeFi components
- `templates/config.json` - Template configuration and Node.js version requirements

### Generated Project Structure
Projects created from this template follow Next.js App Router conventions:

**Core Architecture:**
- `src/app/[locale]/` - Internationalized Next.js App Router pages
- `src/components/` - React components organized by purpose
  - `common/` - Shared components (language selector, logo, newsletter)
  - `layouts/` - Header and Footer components
  - `ui/` - Reusable UI primitives (based on shadcn/ui patterns)
- `src/lib/` - Utilities and configurations
  - `i18n/` - Internationalization setup and locale definitions
  - `features/` - Redux feature slices
- `src/store/` - Redux store configuration with slices and reducers

**State Management:**
- Redux Toolkit with configured store in `src/store/index.ts`
- Example counter slice in `src/lib/features/counter/counterSlice.ts`
- UI state management in `src/store/slices/uiSlice.ts`

**Internationalization:**
- Uses `next-intl` for i18n
- Supports 8 languages: English, Chinese, German, Japanese, Korean, Filipino, Vietnamese, Indonesian
- Locale files in `src/lib/i18n/locales/`
- Middleware handles locale routing with `localePrefix: 'always'`

**Styling System:**
- Tailwind CSS with custom design tokens
- Theme system supporting light/dark modes via `next-themes`
- Custom color palette with primary green theme (#94d873)
- Extensive custom background gradients and animations
- CSS variables for theming in `src/app/globals.css`

**AI Integration (AI-Structured Template):**
- Multi-provider AI system supporting OpenAI, Anthropic, Google Gemini, and Ollama
- Unified AI service with automatic failover and cost optimization
- Chat interface with streaming support
- Token usage tracking and budget management
- API routes at `/api/ai/chat` and `/api/ai/completion`
- Demo page at `/ai-demo`

**Web3 Integration (Web3 Template):**
- Solana wallet integration using `@solana/wallet-adapter-*`
- Support for multiple wallets (Phantom, Backpack, OKX)
- Token swap component with slippage settings
- DeFi utilities for token operations and transactions
- Demo swap interface at `/swap`

## Template Variables

The CLI processes template variables in generated files:
- `{{PROJECT_NAME}}` - User-provided project name
- `{{PROJECT_DESCRIPTION}}` - User-provided description  
- `{{COMPANY_NAME}}` - "Compute Labs"
- `{{CURRENT_YEAR}}` - Current year

## Template Selection Flow

The CLI now presents users with three project types:
1. User selects project type (Standard Web2, AI-Structured, or Web3)
2. Common questions (project description, author name)
3. Template-specific questions:
   - **AI**: Select providers, include examples
   - **Web3**: Select network, include DeFi components
4. Files are copied and configured based on selections
5. Environment files are generated with appropriate variables

## Development Notes

- Projects use TypeScript with strict configuration
- ESLint and Prettier configured for code quality
- Radix UI components for accessible primitives
- Framer Motion for animations
- Custom component patterns follow shadcn/ui conventions
- All projects include theme switching and responsive design
- AI templates include cost tracking and provider failover
- Web3 templates include transaction utilities and explorer links