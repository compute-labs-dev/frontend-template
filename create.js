#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const validateNpmPackageName = require('validate-npm-package-name');
const path = require('path');
const semver = require('semver');
const { execSync } = require('child_process');

// Get the directory where templates are stored
const TEMPLATE_DIR = path.join(__dirname, 'templates');
const BASE_TEMPLATE_DIR = path.join(__dirname, 'base');
const OPTIONAL_TEMPLATE_DIR = path.join(__dirname, 'optional');

// Get the directory where the command was run
const CWD = process.cwd();

function getGitUserName() {
    try {
        const name = execSync('git config user.name').toString().trim();
        return name;
    } catch (e) {
        // Silently ignore if git is not installed or user.name is not set
        return null;
    }
}

async function processTemplateVariables(projectPath, answers) {
    const currentYear = new Date().getFullYear();
    const replacements = {
        '{{PROJECT_NAME}}': path.basename(projectPath),
        '{{PROJECT_DESCRIPTION}}': answers.projectDescription,
        '{{COMPANY_NAME}}': 'Compute Labs',
        '{{CURRENT_YEAR}}': currentYear.toString(),
        '{{AUTHOR_NAME}}': answers.authorName || 'Compute Labs'
    };

    // Process files that might contain template variables
    const filesToProcess = [
        'package.json',
        'README.md',
        'src/app/[locale]/page.tsx',
        'src/app/[locale]/layout.tsx'
    ];

    for (const file of filesToProcess) {
        const filePath = path.join(projectPath, file);
        if (fs.existsSync(filePath)) {
            let content = await fs.readFile(filePath, 'utf8');
            for (const [placeholder, value] of Object.entries(replacements)) {
                content = content.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
            }
            await fs.writeFile(filePath, content);
        }
    }
}

async function mergePackageJson(projectPath, templatePath) {
    const projectPackageJsonPath = path.join(projectPath, 'package.json');
    const snippetPath = path.join(templatePath, 'package.json.snippet');
    
    if (!fs.existsSync(snippetPath)) {
        return;
    }
    
    try {
        const projectPackage = await fs.readJson(projectPackageJsonPath);
        const snippet = await fs.readJson(snippetPath);
        
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
        
        // Sort dependencies alphabetically
        if (projectPackage.dependencies) {
            projectPackage.dependencies = Object.keys(projectPackage.dependencies)
                .sort()
                .reduce((obj, key) => {
                    obj[key] = projectPackage.dependencies[key];
                    return obj;
                }, {});
        }
        
        if (projectPackage.devDependencies) {
            projectPackage.devDependencies = Object.keys(projectPackage.devDependencies)
                .sort()
                .reduce((obj, key) => {
                    obj[key] = projectPackage.devDependencies[key];
                    return obj;
                }, {});
        }
        
        // Write back the merged package.json
        await fs.writeJson(projectPackageJsonPath, projectPackage, { spaces: 2 });
    } catch (error) {
        console.warn(chalk.yellow(`Warning: Could not merge package.json dependencies: ${error.message}`));
    }
}

async function createEnvironmentFile(projectPath, answers) {
    let envContent = '# Environment Variables\n\n';
    
    if (answers.projectType === 'ai') {
        envContent += '# AI Provider API Keys\n';
        if (answers.aiProviders.includes('openai')) {
            envContent += 'OPENAI_API_KEY=sk-...\n';
        }
        if (answers.aiProviders.includes('anthropic')) {
            envContent += 'ANTHROPIC_API_KEY=sk-ant-...\n';
        }
        if (answers.aiProviders.includes('gemini')) {
            envContent += 'GOOGLE_API_KEY=AI...\n';
        }
        if (answers.aiProviders.includes('ollama')) {
            envContent += 'OLLAMA_HOST=http://localhost:11434\n';
        }
        envContent += '\n# Model Selection\n';
        envContent += 'DEFAULT_AI_PROVIDER=' + (answers.aiProviders[0] || 'openai') + '\n';
        envContent += 'DEFAULT_MODEL=gpt-4-turbo\n';
        envContent += '\n# Cost Management\n';
        envContent += 'MONTHLY_AI_BUDGET_USD=100\n';
        envContent += 'ENABLE_COST_OPTIMIZATION=true\n';
    } else if (answers.projectType === 'web3') {
        envContent += '# Solana Network\n';
        envContent += `NEXT_PUBLIC_SOLANA_NETWORK=${answers.solanaNetwork}\n`;
        const rpcUrls = {
            'devnet': 'https://api.devnet.solana.com',
            'testnet': 'https://api.testnet.solana.com',
            'mainnet-beta': 'https://api.mainnet-beta.solana.com'
        };
        envContent += `NEXT_PUBLIC_RPC_URL=${rpcUrls[answers.solanaNetwork]}\n`;
        envContent += '\n# Optional: Custom RPC\n';
        envContent += '# NEXT_PUBLIC_CUSTOM_RPC=https://your-rpc-endpoint.com\n';
        if (answers.includeDefi) {
            envContent += '\n# DEX Integration (for token swap)\n';
            envContent += 'NEXT_PUBLIC_JUPITER_API=https://quote-api.jup.ag/v6\n';
        }
    }
    
    envContent += '\n# Next.js\n';
    envContent += 'NEXT_PUBLIC_APP_URL=http://localhost:3000\n';
    
    await fs.writeFile(path.join(projectPath, '.env.local'), envContent);
    await fs.writeFile(path.join(projectPath, '.env.example'), envContent.replace(/=.*/g, '='));
}

function displayWelcomeBanner() {
    console.log(chalk.green(`
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║   ██████╗ ██████╗ ███╗   ███╗██████╗ ██╗   ██╗████████╗███████╗  ║
║  ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██║   ██║╚══██╔══╝██╔════╝  ║
║  ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║   ██║   █████╗    ║
║  ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║   ██║   ██╔══╝    ║
║  ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝   ██║   ███████╗  ║
║   ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝    ╚═╝   ╚══════╝  ║
║                                                                    ║
║          ██╗      █████╗ ██████╗ ███████╗                        ║
║          ██║     ██╔══██╗██╔══██╗██╔════╝                        ║
║          ██║     ███████║██████╔╝███████╗                        ║
║          ██║     ██╔══██║██╔══██╗╚════██║                        ║
║          ███████╗██║  ██║██████╔╝███████║                        ║
║          ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝                        ║
║                                                                    ║
║              🚀 Project Template Generator v2.0                    ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
    `));
    console.log(chalk.cyan('Welcome to the Compute Labs project generator!\n'));
}

async function main() {
    displayWelcomeBanner();

    // --- Load Template Configuration ---
    let templateConfig;
    try {
        const configPath = path.join(TEMPLATE_DIR, 'config.json');
        templateConfig = await fs.readJson(configPath);
    } catch (error) {
        console.error(chalk.red('Error: Could not load template configuration from templates/config.json.'));
        console.error(error);
        process.exit(1);
    }

    // --- Node.js Version Check ---
    const requiredNodeVersion = templateConfig.nodeVersion;
    if (!semver.satisfies(process.version, requiredNodeVersion)) {
        console.error(chalk.red(`Error: Your Node.js version (${process.version}) is not supported.`));
        console.error(chalk.red(`Please use Node.js version ${requiredNodeVersion}.`));
        process.exit(1);
    }

    // --- Project Name Validation ---
    const projectNameArg = process.argv[2];
    if (!projectNameArg) {
        console.error(chalk.red('Error: Project name is required.'));
        console.log('Usage: npx create-computelabs-app <project-name>');
        process.exit(1);
    }

    const validationResult = validateNpmPackageName(projectNameArg);
    if (!validationResult.validForNewPackages) {
        console.error(chalk.red(`Error: Invalid project name "${projectNameArg}".`));
        if (validationResult.errors) {
            validationResult.errors.forEach(err => console.error(chalk.red(`  ${err}`)));
        }
        if (validationResult.warnings) {
            validationResult.warnings.forEach(warn => console.warn(chalk.yellow(`  ${warn}`)));
        }
        process.exit(1);
    }
    const projectName = projectNameArg;
    const projectPath = path.join(CWD, projectName);

    console.log(chalk.green(`Creating new project: ${projectName} at ${projectPath}`));

    // --- Directory Exists Check ---
    if (fs.existsSync(projectPath)) {
        const { overwrite } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                message: chalk.yellow(`Directory "${projectName}" already exists. Overwrite?`),
                default: false,
            },
        ]);

        if (!overwrite) {
            console.log(chalk.cyan('Operation cancelled.'));
            process.exit(0);
        }
        console.log(chalk.yellow(`Overwriting directory: ${projectName} ...`));
        await fs.emptyDir(projectPath);
    } else {
        await fs.ensureDir(projectPath);
    }

    // --- Project Type Selection ---
    const projectTypeQuestion = {
        type: 'list',
        name: 'projectType',
        message: 'Select your project type:',
        choices: [
            {
                name: chalk.blue('Standard Web2') + ' - Next.js app with theming and i18n',
                value: 'standard',
                short: 'Standard Web2'
            },
            {
                name: chalk.yellow('AI-Structured') + ' - AI-powered app with multiple LLM providers',
                value: 'ai',
                short: 'AI-Structured'
            },
            {
                name: chalk.magenta('Web3') + ' - Blockchain app with Solana wallet integration',
                value: 'web3',
                short: 'Web3'
            },
            {
                name: chalk.cyan('🚀 AI + Web3 Combined') + ' - Full-stack with AI and blockchain features',
                value: 'ai-web3',
                short: 'AI + Web3'
            }
        ]
    };

    const { projectType } = await inquirer.prompt(projectTypeQuestion);

    // --- Common Questions ---
    const defaultAuthor = getGitUserName();
    const commonQuestions = [
        {
            type: 'input',
            name: 'projectDescription',
            message: 'Project description:',
            default: `A new Compute Labs ${projectType === 'ai' ? 'AI-powered' : projectType === 'web3' ? 'Web3' : ''} project`,
        },
        {
            type: 'input',
            name: 'authorName',
            message: 'Author name:',
            default: defaultAuthor || '',
        },
    ];

    const commonAnswers = await inquirer.prompt(commonQuestions);

    // --- Template-Specific Questions ---
    let templateSpecificAnswers = {};
    
    if (projectType === 'ai') {
        const aiQuestions = [
            {
                type: 'checkbox',
                name: 'aiProviders',
                message: 'Select AI providers to include:',
                choices: [
                    { name: 'OpenAI', value: 'openai', checked: true },
                    { name: 'Anthropic (Claude)', value: 'anthropic' },
                    { name: 'Google Gemini', value: 'gemini' },
                    { name: 'Ollama (Local models)', value: 'ollama' }
                ],
                validate: (choices) => choices.length > 0 || 'Please select at least one AI provider'
            },
            {
                type: 'confirm',
                name: 'includeExamples',
                message: 'Include example AI components and demo pages?',
                default: true
            }
        ];
        templateSpecificAnswers = await inquirer.prompt(aiQuestions);
    } else if (projectType === 'web3') {
        const web3Questions = [
            {
                type: 'list',
                name: 'solanaNetwork',
                message: 'Select Solana network:',
                choices: [
                    { name: 'Devnet (Development)', value: 'devnet' },
                    { name: 'Testnet (Testing)', value: 'testnet' },
                    { name: 'Mainnet-Beta (Production)', value: 'mainnet-beta' }
                ],
                default: 'devnet'
            },
            {
                type: 'confirm',
                name: 'includeDefi',
                message: 'Include DeFi components (Token Swap)?',
                default: true
            }
        ];
        templateSpecificAnswers = await inquirer.prompt(web3Questions);
    } else if (projectType === 'ai-web3') {
        const combinedQuestions = [
            {
                type: 'checkbox',
                name: 'aiProviders',
                message: 'Select AI providers to include:',
                choices: [
                    { name: 'OpenAI', value: 'openai', checked: true },
                    { name: 'Anthropic (Claude)', value: 'anthropic', checked: true },
                    { name: 'Google Gemini', value: 'gemini' },
                    { name: 'Ollama (Local models)', value: 'ollama' }
                ],
                validate: (choices) => choices.length > 0 || 'Please select at least one AI provider'
            },
            {
                type: 'list',
                name: 'solanaNetwork',
                message: 'Select Solana network:',
                choices: [
                    { name: 'Devnet (Development)', value: 'devnet' },
                    { name: 'Testnet (Testing)', value: 'testnet' },
                    { name: 'Mainnet-Beta (Production)', value: 'mainnet-beta' }
                ],
                default: 'devnet'
            },
            {
                type: 'confirm',
                name: 'includeAllFeatures',
                message: 'Include all AI and DeFi example components?',
                default: true
            }
        ];
        templateSpecificAnswers = await inquirer.prompt(combinedQuestions);
        // Map for consistency
        templateSpecificAnswers.includeExamples = templateSpecificAnswers.includeAllFeatures;
        templateSpecificAnswers.includeDefi = templateSpecificAnswers.includeAllFeatures;
    }

    const answers = {
        projectType,
        ...commonAnswers,
        ...templateSpecificAnswers
    };

    console.log(chalk.cyan('\nProject configuration:'));
    console.log(chalk.cyan(`  Project Type: ${answers.projectType === 'ai' ? 'AI-Structured' : answers.projectType === 'web3' ? 'Web3' : 'Standard Web2'}`));
    console.log(chalk.cyan(`  Description: ${answers.projectDescription}`));
    console.log(chalk.cyan(`  Author: ${answers.authorName}`));
    
    if (answers.projectType === 'ai') {
        console.log(chalk.cyan(`  AI Providers: ${answers.aiProviders.join(', ')}`));
        console.log(chalk.cyan(`  Include Examples: ${answers.includeExamples ? 'Yes' : 'No'}`));
    } else if (answers.projectType === 'web3') {
        console.log(chalk.cyan(`  Solana Network: ${answers.solanaNetwork}`));
        console.log(chalk.cyan(`  Include DeFi: ${answers.includeDefi ? 'Yes' : 'No'}`));
    }

    const spinner = ora('Copying template files...').start();

    try {
        // Validate base template exists
        if (!fs.existsSync(BASE_TEMPLATE_DIR)) {
            throw new Error(`Base template directory not found at ${BASE_TEMPLATE_DIR}`);
        }

        // Step 1: Copy base template files
        await fs.copy(BASE_TEMPLATE_DIR, projectPath, { 
            filter: src => !src.endsWith('.gitkeep') && !src.includes('node_modules') && !src.endsWith('.DS_Store')
        });
        spinner.text = 'Base files copied.';

        // Step 2: Copy template-specific files based on project type
        if (answers.projectType === 'web3') {
            spinner.text = 'Copying Web3 template files...';
            const web3TemplatePath = path.join(OPTIONAL_TEMPLATE_DIR, 'web3-solana-starter');
            if (fs.existsSync(web3TemplatePath)) {
                await fs.copy(web3TemplatePath, projectPath, { 
                    overwrite: true,
                    filter: src => !src.endsWith('.gitkeep') && !src.includes('node_modules') && !src.endsWith('.DS_Store') && !src.endsWith('package.json.snippet')
                });
                
                // Merge package.json dependencies
                await mergePackageJson(projectPath, web3TemplatePath);
                spinner.text = 'Web3 files copied.';
            } else {
                spinner.warn(chalk.yellow('Web3 template directory not found. Skipping Web3 files.'));
            }
        } else if (answers.projectType === 'ai') {
            spinner.text = 'Copying AI template files...';
            const aiTemplatePath = path.join(OPTIONAL_TEMPLATE_DIR, 'ai-structured');
            if (fs.existsSync(aiTemplatePath)) {
                await fs.copy(aiTemplatePath, projectPath, { 
                    overwrite: true,
                    filter: src => !src.endsWith('.gitkeep') && !src.includes('node_modules') && !src.endsWith('.DS_Store') && !src.endsWith('package.json.snippet')
                });
                
                // Merge package.json dependencies
                await mergePackageJson(projectPath, aiTemplatePath);
                spinner.text = 'AI files copied.';
            } else {
                spinner.warn(chalk.yellow('AI template directory not found. Skipping AI files.'));
            }
        } else if (answers.projectType === 'ai-web3') {
            spinner.text = 'Copying AI + Web3 combined template files...';
            const combinedTemplatePath = path.join(OPTIONAL_TEMPLATE_DIR, 'ai-web3-combined');
            if (fs.existsSync(combinedTemplatePath)) {
                await fs.copy(combinedTemplatePath, projectPath, { 
                    overwrite: true,
                    filter: src => !src.endsWith('.gitkeep') && !src.includes('node_modules') && !src.endsWith('.DS_Store') && !src.endsWith('package.json.snippet')
                });
                
                // Merge package.json dependencies
                await mergePackageJson(projectPath, combinedTemplatePath);
                spinner.text = 'AI + Web3 files copied.';
            } else {
                spinner.warn(chalk.yellow('AI + Web3 combined template directory not found. Skipping combined files.'));
            }
        }

        // Step 3: Process template variables and create environment files
        spinner.text = 'Processing template variables...';
        await processTemplateVariables(projectPath, answers);
        await createEnvironmentFile(projectPath, answers);

        spinner.succeed(chalk.green('Template files copied successfully!'));

        // Step 4: Initialize git repository
        try {
            execSync('git init', { cwd: projectPath });
            console.log(chalk.green('\n✅ Git repository initialized'));
        } catch (error) {
            console.warn(chalk.yellow('\n⚠️ Failed to initialize git repository'));
        }

        // Final success message
        console.log(chalk.green('\n🎉 Project created successfully!'));
        console.log(chalk.cyan('\nNext steps:'));
        console.log(chalk.cyan(`  cd ${projectName}`));
        console.log(chalk.cyan('  npm install'));
        
        if (answers.projectType === 'ai') {
            console.log(chalk.cyan('  # Add your API keys to .env.local'));
            console.log(chalk.cyan('  npm run dev'));
            console.log(chalk.yellow('\n📚 AI Documentation:'));
            console.log(chalk.yellow('  - Check src/lib/ai/ for provider configurations'));
            console.log(chalk.yellow('  - Visit /ai-demo to see the chat interface'));
        } else if (answers.projectType === 'web3') {
            console.log(chalk.cyan('  npm run dev'));
            console.log(chalk.magenta('\n🔗 Web3 Documentation:'));
            console.log(chalk.magenta('  - Wallet connection in src/components/wallet/'));
            if (answers.includeDefi) {
                console.log(chalk.magenta('  - Token swap component in src/components/defi/'));
                console.log(chalk.magenta('  - Visit /swap to try the token swap interface'));
            }
        } else {
            console.log(chalk.cyan('  npm run dev'));
        }
        
        console.log(chalk.blue('\n📖 General Documentation:'));
        console.log(chalk.blue('  - README.md for project overview'));
        console.log(chalk.blue('  - Visit http://localhost:3000 after starting the dev server'));

    } catch (error) {
        spinner.fail(chalk.red('Error copying template files.'));
        console.error(error);
        // Cleanup of projectPath if partial copy occurred
        try {
            await fs.remove(projectPath);
        } catch (cleanupError) {
            console.error(chalk.red('Failed to cleanup after error'));
        }
        process.exit(1);
    }
}

main().catch(err => {
    console.error(chalk.red('An unexpected error occurred:'));
    console.error(err);
    process.exit(1);
}); 