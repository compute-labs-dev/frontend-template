# Testing Guide for Compute Labs Template Generator

## Prerequisites

Before testing, ensure you have:
- Node.js >= 16.0.0
- npm or yarn
- Git installed
- A terminal/command prompt

## Automated Testing

Run the automated test suite:

```bash
node test-templates.js
```

This will validate:
- Template directory structure
- Required files existence
- Dependency configurations

## Manual Testing Checklist

### 1. Test Standard Web2 Template

```bash
# Create a test project
node create.js test-web2-project

# When prompted:
# - Select "Standard Web2"
# - Enter any description
# - Enter any author name

# Navigate to the project
cd test-web2-project

# Install dependencies
npm install

# Run the development server
npm run dev

# Visit http://localhost:3000
```

**Verify:**
- [ ] Project creates without errors
- [ ] Dependencies install successfully
- [ ] Development server starts
- [ ] Homepage loads with Compute Labs branding
- [ ] Theme toggle works (light/dark mode)
- [ ] Internationalization works (check language selector)
- [ ] Redux store is functional

### 2. Test AI-Structured Template

```bash
# Create a test project
node create.js test-ai-project

# When prompted:
# - Select "AI-Structured"
# - Enter any description
# - Enter any author name
# - Select at least OpenAI and Anthropic
# - Choose to include examples

# Navigate to the project
cd test-ai-project

# Install dependencies
npm install

# Check the .env.local file was created
cat .env.local

# Add test API keys (optional, for full testing)
# Edit .env.local and add:
# OPENAI_API_KEY=your-key
# ANTHROPIC_API_KEY=your-key

# Run the development server
npm run dev

# Visit http://localhost:3000/ai-demo
```

**Verify:**
- [ ] Project creates without errors
- [ ] AI provider files are present in `src/lib/ai/`
- [ ] Chat components are in `src/components/ai/`
- [ ] API routes exist at `src/app/api/ai/`
- [ ] `.env.local` contains correct provider keys
- [ ] Development server starts
- [ ] AI demo page loads at `/ai-demo`
- [ ] Model selector shows selected providers
- [ ] Chat interface renders correctly

### 3. Test Web3 Template

```bash
# Create a test project
node create.js test-web3-project

# When prompted:
# - Select "Web3"
# - Enter any description
# - Enter any author name
# - Select "Devnet"
# - Choose to include DeFi components

# Navigate to the project
cd test-web3-project

# Install dependencies
npm install

# Check the .env.local file was created
cat .env.local

# Run the development server
npm run dev

# Visit http://localhost:3000/swap
```

**Verify:**
- [ ] Project creates without errors
- [ ] Wallet provider files are in `src/components/providers/`
- [ ] DeFi components are in `src/components/defi/`
- [ ] Solana utilities are in `src/lib/solana/`
- [ ] `.env.local` contains correct network configuration
- [ ] Development server starts
- [ ] Swap page loads at `/swap`
- [ ] Wallet connection button is visible
- [ ] Token swap interface renders correctly

## Integration Testing

### Test Build Process

For each created project:

```bash
# Build the project
npm run build

# Start production server
npm run start

# Visit http://localhost:3000
```

**Verify:**
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] Production server starts
- [ ] Application works in production mode

### Test Linting and Formatting

```bash
# Run linter
npm run lint

# Run formatter
npm run format
```

**Verify:**
- [ ] Linting passes or shows only minor warnings
- [ ] Formatting completes successfully

## Edge Cases to Test

### 1. Project Name Validation

```bash
node create.js "invalid name with spaces"
# Should show error

node create.js 123invalid
# Should show error

node create.js valid-project-name
# Should work
```

### 2. Existing Directory

```bash
# Create a directory first
mkdir existing-project

# Try to create project with same name
node create.js existing-project
# Should prompt to overwrite
```

### 3. Missing Dependencies

Test with different Node versions:
```bash
# Use nvm or similar to switch Node versions
nvm use 14
node create.js test-old-node
# Should show Node version error
```

### 4. Partial Installation

Interrupt the process (Ctrl+C) during:
- File copying
- Dependency selection

Then check:
- [ ] No partial files left
- [ ] Clean error message

## Performance Testing

Time the creation process:

```bash
time node create.js performance-test
```

**Benchmarks:**
- Standard Web2: Should complete in < 30 seconds
- AI-Structured: Should complete in < 30 seconds
- Web3: Should complete in < 30 seconds

## Cross-Platform Testing

Test on different operating systems:

### Windows
```powershell
node create.js test-windows
```

### macOS
```bash
node create.js test-macos
```

### Linux
```bash
node create.js test-linux
```

**Verify:**
- [ ] Path separators work correctly
- [ ] File permissions are set properly
- [ ] Scripts run without platform-specific errors

## Environment Variable Testing

### Test .env Generation

Check that `.env.local` and `.env.example` are created with:

**For AI Template:**
- [ ] Correct API key placeholders
- [ ] Default provider settings
- [ ] Cost management variables

**For Web3 Template:**
- [ ] Correct network configuration
- [ ] RPC URLs
- [ ] Jupiter API endpoint (if DeFi selected)

## Common Issues and Solutions

### Issue: "Command not found"
**Solution:** Ensure `node` and `npm` are in PATH

### Issue: "Permission denied"
**Solution:** 
```bash
chmod +x create.js
chmod +x test-templates.js
```

### Issue: "Module not found"
**Solution:** Install CLI dependencies first
```bash
npm install
```

### Issue: Dependencies fail to install
**Solution:** Clear npm cache
```bash
npm cache clean --force
```

## Pre-Release Checklist

Before publishing:

- [ ] All automated tests pass
- [ ] Manual testing completed for all templates
- [ ] Documentation is up to date
- [ ] CLAUDE.md reflects current structure
- [ ] Package.json version is updated
- [ ] Git repository is clean
- [ ] No sensitive data in templates
- [ ] All TODO comments are resolved
- [ ] Error messages are user-friendly

## Publishing Checklist

1. **Run final tests:**
   ```bash
   node test-templates.js
   ```

2. **Check package.json:**
   - [ ] Version number updated
   - [ ] Description is accurate
   - [ ] Keywords are relevant
   - [ ] Repository URL is correct
   - [ ] License is appropriate

3. **Verify .gitignore:**
   - [ ] node_modules excluded
   - [ ] .env files excluded
   - [ ] test-output excluded

4. **Create GitHub release:**
   - [ ] Tag version matches package.json
   - [ ] Release notes describe changes
   - [ ] Breaking changes are highlighted

## Continuous Testing

Set up GitHub Actions for automated testing on:
- Pull requests
- Main branch commits
- Release tags

See `.github/workflows/test.yml` for CI configuration.

## Support

If tests fail or you encounter issues:
1. Check the error messages carefully
2. Review recent changes in git history
3. Ensure all dependencies are up to date
4. Open an issue with detailed reproduction steps

---

Last updated: December 2024
Version: 2.0.0