# Company Template CLI - Product Requirements Document

## Overview

Create a private GitHub repository-based template system that allows developers to quickly scaffold new projects with company-standard layouts, components, and configurations. The system should provide an interactive CLI experience similar to `create-next-app` while maintaining privacy through GitHub repository access control.

## Goals

- **Primary**: Enable rapid project scaffolding with company standards
- **Secondary**: Maintain consistency across company projects
- **Tertiary**: Reduce setup time for new projects from hours to minutes

## User Stories

**As a developer, I want to:**
- Quickly create a new project with company-approved components and layouts
- Choose which optional features to include during setup
- Have all dependencies automatically installed and configured
- Start with a working, runnable project immediately after setup

**As a team lead, I want to:**
- Ensure all projects follow company standards and conventions
- Easily update and maintain shared components across projects
- Control access to company templates through existing GitHub permissions

## Technical Requirements

### Repository Structure [IN PROGRESS]

```
company-template-repo/
├── README.md [COMPLETE]
├── package.json                 # Template dependencies for setup script [COMPLETE]
├── create.js                    # Main setup script [IN PROGRESS - basic structure and some prompts]
├── .gitignore [COMPLETE]
├── base/                        # Core template files [IN PROGRESS]
│   ├── package.json            # Project package.json template. Includes Next.js, React, TypeScript, Tailwind CSS, i18n (next-intl), Redux, and essential related packages. [COMPLETE]
│   ├── README.md               # Project README template, updated for App Router, i18n, Redux, ThemeProvider. [COMPLETE]
│   ├── .env.example            # [SKIPPED - tool limitation, noted]
│   ├── .gitignore              # Project .gitignore [COMPLETE]
│   ├── next.config.mjs         # Next.js configuration [COMPLETE]
│   ├── tsconfig.json           # TypeScript configuration [COMPLETE]
│   ├── postcss.config.js       # PostCSS configuration (for Tailwind CSS) [COMPLETE]
│   ├── tailwind.config.ts      # Tailwind CSS configuration [COMPLETE]
│   ├── src/                    # Source directory, structured for Next.js App Router [COMPLETE]
│   │   ├── app/                # Next.js App Router directory
│   │   │   ├── [locale]/       # Locale-based routing
│   │   │   │   ├── layout.tsx  # Root layout for the locale, includes providers [COMPLETE]
│   │   │   │   └── page.tsx    # Default page for the locale [COMPLETE]
│   │   │   ├── globals.css     # Global styles, Tailwind directives, CSS custom properties [COMPLETE]
│   │   │   └── global-error.tsx # App-wide error handling [COMPLETE]
│   │   ├── components/         # Reusable components directory [COMPLETE]
│   │   │   └── common/         # Base components all projects get (e.g., providers) [COMPLETE - ThemeProvider, ReduxProvider, RootProviders]
│   │   │   └── ui/             # (Recommended) For UI primitive components [TO DO]
│   │   ├── assets/             # Static assets like fonts [COMPLETE]
│   │   │   └── fonts/          # Font files and definitions (fonts.css) [COMPLETE - structure, empty fonts.css]
│   │   ├── lib/                # For shared libraries, Redux store, features [COMPLETE - Redux store, example slice]
│   │   │   ├── store.ts
│   │   │   └── features/
│   │   │       └── counter/
│   │   │           └── counterSlice.ts
│   │   ├── utils/              # Utility functions [COMPLETE - directory exists]
│   │   ├── middleware.ts       # Internationalization (i18n) routing middleware [COMPLETE]
│   │   └── instrumentation.ts  # OpenTelemetry instrumentation placeholder [COMPLETE]
│   ├── public/                 # Public assets [COMPLETE - favicon.ico placeholder]
│   │   └── favicon.ico
│   ├── messages/               # i18n translation files [COMPLETE]
│   │   └── en.json
│   └── [other framework files] # (e.g. next-env.d.ts - created by Next.js usually)
├── optional/                   # Optional components and features [TO DO]
│   └── web3-solana-starter/    # Optional Web3 starter kit for Solana
│       ├── components/         # Pre-built Web3 components (e.g., WalletConnector)
│       ├── hooks/              # Web3 specific hooks
│       └── utils/              # Web3 utility functions
│       └── package.json.snippet # Dependencies to be merged if selected
├── templates/                  # Alternative base templates
│   ├── config.json            # Template metadata
│   └── [template-name]/       # Alternative starting points
└── scripts/
    └── post-install.js        # Optional post-installation tasks
```

### Core Features

#### 1. Interactive Setup Script (`create.js`) [IN PROGRESS]

**Requirements:**
- Must be executable with `node create.js <project-name>` [PARTIALLY COMPLETE - script exists]
- Must validate project name (no spaces, valid npm package name format) [COMPLETE]
- Must check if directory already exists and prompt for overwrite [TO DO]
- Must provide interactive prompts for optional features (e.g., Web3 support) [PARTIALLY COMPLETE - description prompt exists]
- Must handle keyboard interrupts gracefully (Ctrl+C) [TO DO]

**Dependencies to include (for `create.js` script):** [COMPLETE - added to root package.json]
```json
{
  "inquirer": "^8.0.0",
  "fs-extra": "^11.0.0",
  "chalk": "^4.1.2",
  "ora": "^5.4.1",
  "validate-npm-package-name": "^4.0.0"
}
```

#### 2. Project Initialization Flow [IN PROGRESS - focus on `base/` content]

**Base Project Dependencies (for `base/package.json`):** [COMPLETE - all specified plus `next-intl`, `@reduxjs/toolkit`, `react-redux`]
*   **Core:** `next`, `react`, `react-dom`
*   **TypeScript:** `typescript`, `@types/node`, `@types/react`, `@types/react-dom`
*   **Styling (Tailwind CSS):** `tailwindcss`, `postcss`, `autoprefixer`
*   **Tailwind Utilities:** `tailwind-merge`, `tailwindcss-animate`, `clsx`, `lucide-react`, `class-variance-authority`, `next-themes`
*   **Internationalization:** `next-intl`
*   **State Management:** `@reduxjs/toolkit`, `react-redux`
*   **Linting/Formatting (Dev):** `eslint`, `eslint-config-next`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-config-prettier`, `prettier`, `prettier-plugin-tailwindcss`

**Optional Web3 (Solana) Dependencies (if selected):**
*   `@coral-xyz/anchor`
*   `@solana/spl-token`
*   `@solana/wallet-adapter-react`
*   `@solana/wallet-adapter-react-ui`
*   `@solana/wallet-adapter-wallets`
*   `@solana/web3.js`
*   `bs58`
*   `tweetnacl`
*   `tweetnacl-util`
*   *(Plus any relevant UI components or utilities from the broader list provided, e.g., for Radix UI if Web3 components use them)*

**Step 1: Validation**
- Validate project name against npm package naming rules
- Check if target directory exists
- Verify Node.js version compatibility (minimum Node 16)

**Step 2: Interactive Prompts**
- Display welcome message with company branding
- Present list of optional components/features, including:
    - "Include Web3 (Solana) functionalities?"
- Allow multiple selection where appropriate
- Show estimated installation time based on selections

**Step 3: File Operations**
- Copy base template files to target directory
- Conditionally copy optional component files based on user selections
- Process template variables in files (project name, description, etc.)
- Clean up temporary directories and unused optional files

**Step 4: Package Management**
- Update project `package.json` with user selections (merging base dependencies and any selected optional dependencies like Web3 packages)
- Install base dependencies
- Install optional dependencies based on user choices (e.g., Web3 packages)
- Run any post-installation scripts

**Step 5: Finalization**
- Display success message with next steps
- Show relevant documentation links

#### 3. Template Variable Replacement

**Required Variables:**
- `{{PROJECT_NAME}}` - Project directory name
- `{{PROJECT_DESCRIPTION}}` - User-provided description
- `{{COMPANY_NAME}}` - Company name (from config)
- `{{CURRENT_YEAR}}` - Current year for copyright notices
- `{{AUTHOR_NAME}}` - Git user name or prompt for input

**File Processing:**
- Process `.json`, `.js`, `.jsx`, `.ts`, `.tsx`, `.md`, `.html` files
- Skip binary files and `node_modules`
- Maintain file permissions during copy operations

#### 4. Configuration Management

**Template Configuration (`templates/config.json`):**
```json
{
  "templates": [
    {
      "name": "default",
      "description": "Standard React/Next.js application",
      "path": "base"
    }
  ],
  "company": {
    "name": "Company Name",
    "repository": "https://github.com/company/template-repo"
  },
  "nodeVersion": ">=16.0.0"
}
```

#### 5. Error Handling

**Required Error Scenarios:**
- Invalid project name
- Directory already exists
- Insufficient permissions
- Network connectivity issues
- Missing dependencies
- Git initialization failures
- npm installation failures

**Error Response Requirements:**
- Clear, actionable error messages
- Cleanup of partial installations on failure
- Graceful exit codes
- Logging capability for debugging

### User Experience Requirements

#### 1. CLI Interface

**Welcome Screen:**
```
🚀 Compute Labs Project Template

Creating new project: my-awesome-app
```

**Progress Indicators:**
- Spinner for long-running operations
- Progress bars for file operations
- Clear status messages for each step

**Success Screen:**
```
✅ Project created successfully!

Next steps:
  cd my-awesome-app
  npm run dev

Documentation: [link]
Support: [link]
```

#### 2. Interactive Prompts

**Example Prompt Structure:**
```
? Select optional components: (Press <space> to select, <enter> to confirm)
  ◯ Component A - Description of what it does
  ◯ Component B - Description of what it does
  ◯ Component C - Description of what it does

? Choose authentication provider: (Use arrow keys)
❯ None
  Provider A
  Provider B
  Provider C
```

#### 3. Performance Requirements

- Template copying should complete in under 30 seconds
- npm installation time depends on selections but should show progress
- Total setup time should not exceed 5 minutes for full installation

### Usage Instructions

#### 1. Developer Usage

**Method 1: Direct Clone**
```bash
git clone https://github.com/company/company-template-repo.git my-new-project
cd my-new-project
node create.js my-new-project
```

**Method 2: One-liner Script (future enhancement)**
```bash
curl -s https://raw.githubusercontent.com/company/company-template-repo/main/setup.sh | bash -s my-new-project
```

### Testing Requirements

#### 1. Unit Tests
- Template variable replacement functionality
- File copying operations
- Package.json manipulation
- Input validation

#### 2. Integration Tests
- Complete project creation flow
- Different optional component combinations
- Error scenarios and cleanup
- Cross-platform compatibility (Windows, macOS, Linux)

#### 3. Manual Testing Checklist
- [ ] Created project runs without errors
- [ ] All selected components are properly integrated
- [ ] Package.json contains correct dependencies
- [ ] Git repository is properly initialized
- [ ] README contains project-specific information
- [ ] Environment variables template is created

### Maintenance and Updates

#### 1. Template Updates
- Version control for template changes
- Backward compatibility considerations
- Update notification system (future enhancement)

#### 2. Component Library Integration
- Sync with company design system updates
- Automated testing of component compatibility
- Documentation updates

### Security Considerations

- No sensitive data in template files
- Environment variable templates only (no actual secrets)
- Secure dependency versions
- Regular security audits of template dependencies

### Future Enhancements

**Phase 2 (Optional):**
- Web-based template selector interface
- Custom component generator within projects
- Integration with company CI/CD pipelines
- Template usage analytics
- Automatic updates notification system

## Acceptance Criteria

**The implementation is complete when:**

1. ✅ Developer can run `node create.js <project-name>` and create a working project [IN PROGRESS - `create.js` is basic, project not yet fully generatable]
2. ✅ Interactive prompts allow selection of optional components [IN PROGRESS - only description prompt so far]
3. ✅ Created project contains all selected components and dependencies [IN PROGRESS - `base/` has dependencies, component selection in `create.js` TO DO]
4. ✅ Project can be immediately run with `npm run dev` (or equivalent) [TO DO - requires `create.js` to finish copying and installing]
5. ✅ All template variables are properly replaced [IN PROGRESS - some variables in `base/` files, replacement logic in `create.js` TO DO]
6. ✅ Error handling works for common failure scenarios [TO DO - for `create.js`]
7. ✅ Documentation is complete and accessible [IN PROGRESS - `base/README.md` is good, overall project README needs more]
8. ✅ Solution works on Windows, macOS, and Linux [TO DO - testing phase]
9. ✅ Repository permissions control access appropriately [N/A for CLI tool itself, applies to repo hosting]
10. ✅ Setup completes in under 5 minutes for full installation [TO DO - performance testing phase]

## Success Metrics

- **Adoption Rate**: 80% of new projects use the template within 3 months
- **Setup Time**: Average project creation time under 3 minutes
- **Developer Satisfaction**: 4.5/5 rating in internal surveys
- **Consistency Score**: 90% of projects follow company standards
- **Support Requests**: Less than 5 template-related support requests per month