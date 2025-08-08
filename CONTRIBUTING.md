# Contributing to Compute Labs Template Generator

Thank you for your interest in contributing to the Compute Labs Template Generator! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Accept feedback gracefully

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates. When creating a bug report, include:

1. **Clear title and description**
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **System information** (OS, Node version, npm version)
6. **Error messages** (if any)
7. **Screenshots** (if applicable)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please include:

1. **Use case description**
2. **Proposed solution**
3. **Alternative solutions considered**
4. **Additional context**

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Run tests** (`node test-templates.js`)
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to your branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

## Development Setup

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn
- Git

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/compute-labs/computelabs-template.git
cd computelabs-template
```

2. Install dependencies:
```bash
npm install
```

3. Test the CLI locally:
```bash
node create.js test-project
```

4. Run tests:
```bash
node test-templates.js
```

## Project Structure

```
computelabs-template/
├── create.js                 # Main CLI script
├── test-templates.js         # Test suite
├── base/                     # Standard template files
├── optional/
│   ├── ai-structured/        # AI template files
│   └── web3-solana-starter/  # Web3 template files
├── templates/
│   └── config.json          # Template configuration
└── docs/                    # Documentation
```

## Adding New Templates

To add a new template type:

1. **Create template directory** in `optional/`
2. **Add template files** (components, utilities, etc.)
3. **Create package.json.snippet** with dependencies
4. **Update create.js** to handle the new template:
   - Add to project type selection
   - Add template-specific questions
   - Add file copying logic
5. **Update documentation**
6. **Add tests** in `test-templates.js`

### Template Requirements

Each template must include:
- Proper directory structure
- Required dependencies in `package.json.snippet`
- Example components/pages
- Environment variable templates
- Documentation

## Code Style Guidelines

### JavaScript/TypeScript

- Use ES6+ features
- Async/await over promises
- Meaningful variable names
- JSDoc comments for functions

### React/Next.js

- Functional components with hooks
- TypeScript for type safety
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling

### Git Commits

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

Examples:
```
feat: add GraphQL template option
fix: resolve path issue on Windows
docs: update AI provider configuration guide
```

## Testing Guidelines

### Unit Tests

Test individual functions and utilities:
```javascript
// Test template validation
function testTemplateValidation() {
  // Test code here
}
```

### Integration Tests

Test complete template generation:
```bash
node create.js test-integration --type ai
```

### Manual Testing

Before submitting PR:
1. Create projects with all template types
2. Verify dependencies install correctly
3. Ensure dev server starts
4. Check production build works

## Documentation

### Code Comments

Add comments for:
- Complex logic
- External API interactions
- Configuration options
- Workarounds or hacks

### README Updates

Update README.md when:
- Adding new features
- Changing CLI options
- Modifying template structure

### CLAUDE.md Updates

Update CLAUDE.md when:
- Changing architecture
- Adding new commands
- Modifying template structure

## Review Process

### PR Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] No sensitive data exposed

### Merge Criteria

PRs will be merged when:
1. All tests pass
2. Code review approved
3. Documentation complete
4. No merge conflicts

## Release Process

1. **Version Bump**: Update version in package.json
2. **Changelog**: Update CHANGELOG.md
3. **Test**: Run full test suite
4. **Tag**: Create git tag
5. **Release**: Create GitHub release
6. **Publish**: Publish to npm (maintainers only)

## Getting Help

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Solana Web3.js](https://docs.solana.com/developing/clients/javascript-api)
- [OpenAI API](https://platform.openai.com/docs)

### Contact

- **Issues**: [GitHub Issues](https://github.com/compute-labs/computelabs-template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/compute-labs/computelabs-template/discussions)
- **Email**: dev@computelabs.com

## Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT/Apache 2.0).

---

Thank you for contributing to Compute Labs Template Generator! 🚀