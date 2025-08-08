# Publishing to npm

This guide explains how to publish `create-computelabs-app` to npm.

## Prerequisites

1. **npm account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **Login to npm**: Run `npm login` and enter your credentials
3. **Verify login**: Run `npm whoami` to confirm you're logged in

## Pre-publish Checklist

- [x] All tests pass (`npm test`)
- [x] Package.json is configured correctly
- [x] LICENSE file exists (MIT)
- [x] README.md is updated for npm users
- [x] .npmignore is configured
- [x] Executable bin script is created
- [x] Version number is set appropriately

## Testing Locally

The package has been tested locally using `npm link`. To test it yourself:

```bash
# In the package directory
npm link

# In a test directory
npx create-computelabs-app test-app

# Or without npx
create-computelabs-app test-app
```

## Publishing Steps

### 1. First-time Publishing

```bash
# Make sure you're logged in
npm whoami

# Publish to npm (public package)
npm publish --access public
```

### 2. Publishing Updates

```bash
# Update version (choose patch, minor, or major)
npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
npm version minor  # for new features (1.0.0 -> 1.1.0)
npm version major  # for breaking changes (1.0.0 -> 2.0.0)

# Publish the update
npm publish
```

## Post-publish Verification

After publishing, verify the package works:

```bash
# Clear npm cache
npm cache clean --force

# Test installation
npx create-computelabs-app@latest test-project

# Check npm page
open https://www.npmjs.com/package/create-computelabs-app
```

## Version Management

Current version: 1.0.0

### Semantic Versioning
- **Patch** (1.0.x): Bug fixes, minor updates
- **Minor** (1.x.0): New features, backwards compatible
- **Major** (x.0.0): Breaking changes

## Troubleshooting

### If publish fails

1. **Check npm login**: `npm whoami`
2. **Check package name availability**: The name might be taken
3. **Check version**: Make sure version is incremented
4. **Check .npmignore**: Ensure important files aren't excluded

### If package doesn't work after publishing

1. **Clear cache**: `npm cache clean --force`
2. **Check files**: Use `npm pack` to see what gets published
3. **Test locally first**: Always use `npm link` before publishing

## GitHub Release

After publishing to npm:

1. Create a git tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```

2. Create GitHub release:
- Go to GitHub repository
- Click "Releases" → "Create a new release"
- Choose the tag
- Add release notes
- Publish release

## Maintenance

### Regular Updates
- Update dependencies monthly
- Test all templates before each release
- Monitor GitHub issues
- Respond to user feedback

### Security
- Run `npm audit` regularly
- Update vulnerable dependencies
- Test with latest Node.js versions

## Support

For issues or questions:
- GitHub Issues: https://github.com/compute-labs/create-computelabs-app/issues
- Email: dev@computelabs.com