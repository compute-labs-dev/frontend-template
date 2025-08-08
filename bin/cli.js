#!/usr/bin/env node

/**
 * create-computelabs-app
 * Create modern web applications with Compute Labs
 */

const path = require('path');
const { spawn } = require('child_process');

// Get the project name from command line arguments
const args = process.argv.slice(2);

// Run the main create script
const createScript = path.join(__dirname, '..', 'create.js');

const child = spawn('node', [createScript, ...args], {
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  process.exit(code);
});