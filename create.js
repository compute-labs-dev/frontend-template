#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const validateNpmPackageName = require('validate-npm-package-name');
const path = require('path');
const semver = require('semver');

const CWD = process.cwd();

async function main() {
    console.log(chalk.blue('🚀 Compute Labs Project Template') + '\n');

    // --- Load Template Configuration ---
    let templateConfig;
    try {
        const configPath = path.join(__dirname, 'templates', 'config.json');
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
    const projectName = projectNameArg; // Use the validated name
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
        // If user chooses to overwrite, we can add cleanup logic here later if needed.
        // For now, fs-extra's copy will overwrite files by default.
        console.log(chalk.yellow(`Proceeding with overwrite for directory: ${projectName}`));
    }

    // Placeholder for next steps
    // TODO: Interactive prompts (project description, author, Web3 option)
    // TODO: File operations (copy base, copy optional, replace variables)
    // TODO: Package management (update package.json, install dependencies)
    // TODO: Finalization (success message, next steps)

    // Simulate work for now
    const spinner = ora('Initializing project structure (simulation)...').start();
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    spinner.succeed('Project structure initialized (simulation).');

    console.log(chalk.green('\n✅ Project setup will continue here...'));
    console.log(`Next steps (conceptual):
      cd ${projectName}
      npm install
      npm run dev`);
}

main().catch(err => {
    console.error(chalk.red('An unexpected error occurred:'));
    console.error(err); // Log the full error for debugging
    process.exit(1);
}); 