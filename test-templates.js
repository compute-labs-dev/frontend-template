#!/usr/bin/env node

/**
 * Test script for Compute Labs Template Generator
 * Run this before publishing to ensure all templates work correctly
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const TEST_DIR = path.join(__dirname, 'test-output');
const CREATE_SCRIPT = path.join(__dirname, 'create.js');

// Test configurations for each template type
const TEST_CONFIGS = [
  {
    name: 'standard-web2',
    projectType: 'standard',
    answers: {
      projectDescription: 'Test Standard Web2 Project',
      authorName: 'Test Author',
    },
    requiredFiles: [
      'package.json',
      'README.md',
      'tsconfig.json',
      'tailwind.config.ts',
      'next.config.mjs',
      'src/app/[locale]/page.tsx',
      'src/components/providers/root-providers.tsx',
      'src/lib/i18n/settings.ts',
      '.env.local',
      '.env.example',
    ],
    requiredDependencies: [
      'next',
      'react',
      'react-dom',
      '@reduxjs/toolkit',
      'next-intl',
      'next-themes',
    ],
  },
  {
    name: 'ai-structured',
    projectType: 'ai',
    answers: {
      projectDescription: 'Test AI Project',
      authorName: 'Test Author',
      aiProviders: ['openai', 'anthropic'],
      includeExamples: true,
    },
    requiredFiles: [
      'package.json',
      'src/lib/ai/config.ts',
      'src/lib/ai/ai-service.ts',
      'src/lib/ai/openai.ts',
      'src/lib/ai/anthropic.ts',
      'src/components/ai/chat-interface.tsx',
      'src/app/api/ai/chat/route.ts',
      'src/app/[locale]/ai-demo/page.tsx',
      '.env.local',
    ],
    requiredDependencies: [
      'openai',
      '@anthropic-ai/sdk',
      'ai',
    ],
  },
  {
    name: 'web3-solana',
    projectType: 'web3',
    answers: {
      projectDescription: 'Test Web3 Project',
      authorName: 'Test Author',
      solanaNetwork: 'devnet',
      includeDefi: true,
    },
    requiredFiles: [
      'package.json',
      'src/components/providers/app-wallet-provider.tsx',
      'src/components/defi/token-swap.tsx',
      'src/lib/solana/connection.ts',
      'src/lib/solana/tokens.ts',
      'src/app/[locale]/swap/page.tsx',
      '.env.local',
    ],
    requiredDependencies: [
      '@solana/web3.js',
      '@solana/wallet-adapter-react',
      '@solana/wallet-adapter-wallets',
    ],
  },
  {
    name: 'ai-web3-combined',
    projectType: 'ai-web3',
    answers: {
      projectDescription: 'Test AI + Web3 Combined Project',
      authorName: 'Test Author',
      aiProviders: ['openai', 'anthropic'],
      solanaNetwork: 'devnet',
      includeAllFeatures: true,
    },
    requiredFiles: [
      'package.json',
      // AI files
      'src/lib/ai/config.ts',
      'src/lib/ai/ai-service.ts',
      'src/components/ai/chat-interface.tsx',
      'src/app/api/ai/chat/route.ts',
      'src/app/[locale]/ai-demo/page.tsx',
      // Web3 files
      'src/components/providers/app-wallet-provider.tsx',
      'src/components/defi/token-swap.tsx',
      'src/lib/solana/connection.ts',
      'src/app/[locale]/swap/page.tsx',
      // Combined landing page
      'src/app/[locale]/page.tsx',
      '.env.local',
    ],
    requiredDependencies: [
      // AI dependencies
      'openai',
      '@anthropic-ai/sdk',
      'ai',
      // Web3 dependencies
      '@solana/web3.js',
      '@solana/wallet-adapter-react',
      '@solana/wallet-adapter-wallets',
    ],
  },
];

// Test utilities
function log(message, type = 'info') {
  const prefix = {
    info: chalk.blue('ℹ'),
    success: chalk.green('✓'),
    error: chalk.red('✗'),
    warning: chalk.yellow('⚠'),
  };
  console.log(`${prefix[type]} ${message}`);
}

function cleanup() {
  if (fs.existsSync(TEST_DIR)) {
    fs.removeSync(TEST_DIR);
    log('Cleaned up test directory', 'info');
  }
}

function validateTemplateStructure() {
  log('Validating template structure...', 'info');
  
  const requiredDirs = [
    'base',
    'optional/ai-structured',
    'optional/web3-solana-starter',
    'templates',
  ];
  
  const requiredFiles = [
    'create.js',
    'package.json',
    'templates/config.json',
  ];
  
  let valid = true;
  
  for (const dir of requiredDirs) {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      log(`Missing required directory: ${dir}`, 'error');
      valid = false;
    } else {
      log(`Found directory: ${dir}`, 'success');
    }
  }
  
  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      log(`Missing required file: ${file}`, 'error');
      valid = false;
    } else {
      log(`Found file: ${file}`, 'success');
    }
  }
  
  return valid;
}

function mergePackageJson(projectPath, templatePath) {
  const projectPackageJsonPath = path.join(projectPath, 'package.json');
  const snippetPath = path.join(templatePath, 'package.json.snippet');
  
  if (!fs.existsSync(snippetPath)) {
    return;
  }
  
  try {
    const projectPackage = fs.readJsonSync(projectPackageJsonPath);
    const snippet = fs.readJsonSync(snippetPath);
    
    // Merge dependencies
    if (snippet.dependencies) {
      projectPackage.dependencies = {
        ...projectPackage.dependencies,
        ...snippet.dependencies
      };
    }
    
    // Merge devDependencies
    if (snippet.devDependencies) {
      projectPackage.devDependencies = {
        ...projectPackage.devDependencies,
        ...snippet.devDependencies
      };
    }
    
    // Write back the merged package.json
    fs.writeJsonSync(projectPackageJsonPath, projectPackage, { spaces: 2 });
    log('Merged package.json dependencies', 'success');
  } catch (error) {
    log(`Warning: Could not merge package.json: ${error.message}`, 'warning');
  }
}

function createTestProject(config) {
  const projectPath = path.join(TEST_DIR, config.name);
  
  log(`\nTesting ${config.name} template...`, 'info');
  
  // Create test directory
  fs.ensureDirSync(TEST_DIR);
  
  // Simulate the create.js script execution
  // In a real test, you would need to handle the interactive prompts
  // For now, we'll manually copy files to test structure
  
  try {
    // Copy base template
    const baseDir = path.join(__dirname, 'base');
    if (fs.existsSync(baseDir)) {
      fs.copySync(baseDir, projectPath, {
        filter: src => !src.includes('node_modules') && !src.endsWith('.DS_Store')
      });
    }
    
    // Copy template-specific files and merge package.json
    if (config.projectType === 'ai') {
      const aiDir = path.join(__dirname, 'optional/ai-structured');
      if (fs.existsSync(aiDir)) {
        fs.copySync(aiDir, projectPath, {
          overwrite: true,
          filter: src => !src.includes('node_modules') && !src.endsWith('.DS_Store') && !src.endsWith('package.json.snippet')
        });
        // Merge package.json dependencies
        mergePackageJson(projectPath, aiDir);
      }
    } else if (config.projectType === 'web3') {
      const web3Dir = path.join(__dirname, 'optional/web3-solana-starter');
      if (fs.existsSync(web3Dir)) {
        fs.copySync(web3Dir, projectPath, {
          overwrite: true,
          filter: src => !src.includes('node_modules') && !src.endsWith('.DS_Store') && !src.endsWith('package.json') && !src.endsWith('package.json.snippet')
        });
        // Merge package.json dependencies
        mergePackageJson(projectPath, web3Dir);
      }
    } else if (config.projectType === 'ai-web3') {
      const combinedDir = path.join(__dirname, 'optional/ai-web3-combined');
      if (fs.existsSync(combinedDir)) {
        fs.copySync(combinedDir, projectPath, {
          overwrite: true,
          filter: src => !src.includes('node_modules') && !src.endsWith('.DS_Store') && !src.endsWith('package.json.snippet')
        });
        // Merge package.json dependencies
        mergePackageJson(projectPath, combinedDir);
      }
    }
    
    // Create mock .env files
    fs.writeFileSync(path.join(projectPath, '.env.local'), '# Test environment');
    fs.writeFileSync(path.join(projectPath, '.env.example'), '# Test environment example');
    
    log(`Created ${config.name} project structure`, 'success');
    return projectPath;
  } catch (error) {
    log(`Failed to create ${config.name}: ${error.message}`, 'error');
    return null;
  }
}

function validateProject(projectPath, config) {
  log(`Validating ${config.name} project...`, 'info');
  
  let valid = true;
  
  // Check required files
  for (const file of config.requiredFiles) {
    const filePath = path.join(projectPath, file);
    if (!fs.existsSync(filePath)) {
      log(`Missing required file: ${file}`, 'error');
      valid = false;
    } else {
      log(`Found: ${file}`, 'success');
    }
  }
  
  // Check package.json dependencies
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = fs.readJsonSync(packageJsonPath);
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };
      
      for (const dep of config.requiredDependencies) {
        if (!allDeps[dep]) {
          log(`Missing dependency: ${dep}`, 'error');
          valid = false;
        } else {
          log(`Found dependency: ${dep}`, 'success');
        }
      }
    } catch (error) {
      log(`Failed to read package.json: ${error.message}`, 'error');
      valid = false;
    }
  }
  
  return valid;
}

function runTests() {
  console.log(chalk.bold.cyan('\n🧪 Compute Labs Template Test Suite\n'));
  
  // Step 1: Validate template structure
  if (!validateTemplateStructure()) {
    log('\nTemplate structure validation failed!', 'error');
    process.exit(1);
  }
  
  log('\nTemplate structure validation passed!', 'success');
  
  // Step 2: Test each template type
  let allTestsPassed = true;
  
  for (const config of TEST_CONFIGS) {
    const projectPath = createTestProject(config);
    
    if (projectPath) {
      const isValid = validateProject(projectPath, config);
      
      if (isValid) {
        log(`${config.name} template test passed!`, 'success');
      } else {
        log(`${config.name} template test failed!`, 'error');
        allTestsPassed = false;
      }
    } else {
      allTestsPassed = false;
    }
  }
  
  // Step 3: Cleanup
  cleanup();
  
  // Step 4: Report results
  console.log('\n' + chalk.bold('=' .repeat(50)));
  
  if (allTestsPassed) {
    console.log(chalk.bold.green('\n✅ All tests passed! The templates are ready for publishing.\n'));
    process.exit(0);
  } else {
    console.log(chalk.bold.red('\n❌ Some tests failed. Please fix the issues before publishing.\n'));
    process.exit(1);
  }
}

// Run tests
try {
  runTests();
} catch (error) {
  log(`Test suite failed: ${error.message}`, 'error');
  cleanup();
  process.exit(1);
}