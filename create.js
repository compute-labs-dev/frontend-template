#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const validateNpmPackageName = require('validate-npm-package-name');
const path = require('path');
const semver = require('semver');
const { execSync } = require('child_process');

const CWD = process.cwd();
const TEMPLATE_DIR = __dirname;

function getGitUserName() {
    try {
        const name = execSync('git config user.name').toString().trim();
        return name;
    } catch (e) {
        // Silently ignore if git is not installed or user.name is not set
        return null;
    }
}

async function main() {
    console.log(chalk.blue('🚀 Compute Labs Project Template') + '\n');

    // --- Load Template Configuration ---
    let templateConfig;
    try {
        const configPath = path.join(TEMPLATE_DIR, 'templates', 'config.json');
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
        console.log('Usage: node create.js <project-name>');
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

    // --- Interactive Prompts ---
    const defaultAuthor = getGitUserName();
    const questions = [
        {
            type: 'input',
            name: 'projectDescription',
            message: 'Project description:',
            default: 'A new Compute Labs project',
        },
        {
            type: 'input',
            name: 'authorName',
            message: 'Author name:',
            default: defaultAuthor || '',
        },
        {
            type: 'confirm',
            name: 'includeWeb3',
            message: 'Include Web3 (Solana) functionalities?',
            default: false,
        },
    ];

    const answers = await inquirer.prompt(questions);
    const { projectDescription, authorName, includeWeb3 } = answers;

    console.log(chalk.cyan('\nProject options received:'));
    console.log(chalk.cyan(`  Description: ${projectDescription}`));
    console.log(chalk.cyan(`  Author: ${authorName}`));
    console.log(chalk.cyan(`  Include Web3: ${includeWeb3 ? 'Yes' : 'No'}`));

    const spinner = ora('Copying template files...').start();

    try {
        // Step 1: Copy base template files
        const baseTemplatePath = path.join(TEMPLATE_DIR, 'base');
        await fs.copy(baseTemplatePath, projectPath, { 
            filter: src => !src.endsWith('.gitkeep') // Don't copy .gitkeep files
        });
        spinner.text = 'Base files copied.';

        // Step 2: Conditionally copy optional Web3 files
        if (includeWeb3) {
            spinner.text = 'Copying Web3 files...';
            const web3TemplatePath = path.join(TEMPLATE_DIR, 'optional', 'web3-solana-starter');
            if (fs.existsSync(web3TemplatePath)) {
                await fs.copy(web3TemplatePath, projectPath, { 
                    overwrite: true, // Overwrite if files exist (e.g. package.json from base)
                    filter: src => !src.endsWith('.gitkeep')
                });
                spinner.text = 'Web3 files copied.';
            } else {
                spinner.warn(chalk.yellow('Web3 template directory not found. Skipping Web3 files.'));
            }
        }

        // TODO: Step 3: Process template variables in copied files
        // (project Name, description, company name, current year, author name)
        // This will involve reading files, replacing content, and writing them back.
        // Files to process: .json, .js, .jsx, .ts, .tsx, .md, .html

        spinner.succeed(chalk.green('Template files copied successfully!'));

    } catch (error) {
        spinner.fail(chalk.red('Error copying template files.'));
        console.error(error);
        // Consider cleanup of projectPath here if partial copy occurred
        process.exit(1);
    }

    // TODO: Package management (update package.json from snippets, install dependencies based on answers)
    // TODO: Finalization (success message, next steps)

    console.log(chalk.green('\n✅ Project setup progressing...'));
    console.log(`Next steps (conceptual):
      Process variables in files
      Manage package.json and dependencies
      cd ${projectName}
      npm install
      npm run dev`);
}

main().catch(err => {
    console.error(chalk.red('An unexpected error occurred:'));
    console.error(err);
    process.exit(1);
}); 