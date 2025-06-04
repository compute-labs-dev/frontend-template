# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

This project was bootstrapped with [{{COMPANY_NAME}} Template](https://github.com/company/template-repo).

## Project Structure

This project uses the Next.js App Router (`src/app` directory) and is configured for internationalization (i18n) with `next-intl`.

-   `src/app/[locale]/layout.tsx`: The main layout file for your application. It sets up the HTML structure and includes the `NextIntlClientProvider`.
-   `src/app/[locale]/page.tsx`: The default home page for your application.
-   `src/app/globals.css`: Global stylesheets, including Tailwind CSS directives and CSS custom properties for theming.
-   `src/middleware.ts`: Handles internationalized routing.
-   `messages/`: Contains JSON files for translations (e.g., `en.json`).
-   `public/`: Static assets like images and `favicon.ico`.
-   `src/components/`: Recommended location for your React components.
    -   `src/components/common/`: For globally used, common components.
    -   `src/components/ui/`: (Recommended) For basic UI primitive components (buttons, cards, etc.).
-   `src/assets/fonts/`: For local font files, referenced in `src/app/globals.css`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3000/en` if `localePrefix` is 'always') with your browser to see the result.

You can start editing the main page by modifying `src/app/[locale]/page.tsx`. The page auto-updates as you edit the file.

## Styling and Theming

This project uses Tailwind CSS for utility-first styling and supports light/dark mode theming via CSS custom properties and `next-themes` (included in `package.json`).

### Key Files for Customization:

*   **Tailwind Configuration (`tailwind.config.ts`)**:
    *   Modify Tailwind's theme (colors, spacing, typography, etc.) by editing the `theme` object.
    *   Add or remove Tailwind plugins in the `plugins` array.

*   **Global Styles (`src/app/globals.css`)**:
    *   Contains the base `@tailwind` directives.
    *   Defines CSS custom properties (variables) for theming (e.g., `--background`, `--foreground`, `--primary`). You'll find separate blocks for `:root` (light theme defaults) and `[data-theme='dark']` (dark theme overrides).
    *   Add any custom global CSS rules here.
    *   Manages font imports via `@import url(./assets/fonts/fonts.css);`. *(Note: The path is relative to `globals.css` within `src/app`)*.

*   **Font Definitions (`src/assets/fonts/fonts.css`)**:
    *   Define your custom `@font-face` rules in this file.
    *   Ensure the font files are placed in the `src/assets/fonts/` directory.

### Theme Switching

This template includes `next-themes`. To implement theme switching, you would typically:
1.  Create a `ThemeProvider` component (e.g., in `src/components/common/theme-provider.tsx`) that uses `useTheme` from `next-themes`.
2.  Wrap your application's children with this `ThemeProvider` in `src/app/[locale]/layout.tsx`.

To change theme colors:
1.  Update the CSS variables in `src/app/globals.css` for both `:root` and `[data-theme='dark']`.
2.  If you've extended Tailwind's color palette in `tailwind.config.ts` to use these CSS variables (e.g., `primary: 'var(--primary)'`), those changes will automatically apply.

## Internationalization (i18n)

This project is set up with `next-intl` for internationalization.

-   **Message Files**: Translations are stored in JSON files in the `messages/` directory (e.g., `messages/en.json`, `messages/es.json`).
-   **Middleware**: `src/middleware.ts` handles locale detection and routing.
-   **Usage**: Use hooks like `useTranslations` from `next-intl` in your components to access translated strings.
-   **Configuration**: Supported locales and the default locale are configured in `src/middleware.ts`.

## Application Providers

The application utilizes a `RootProviders` component (`src/components/common/root-providers.tsx`) to wrap the entire application with essential context providers. This component is integrated into the main layout (`src/app/[locale]/layout.tsx`).

### Included Providers:

*   **`ReduxProvider` (`src/components/common/redux-provider.tsx`)**:
    *   Integrates Redux state management using `@reduxjs/toolkit`.
    *   The store is configured in `src/lib/store.ts`.
    *   An example `counterSlice` is provided in `src/lib/features/counter/counterSlice.ts`.
    *   To add new state slices: Create your slice (e.g., `src/lib/features/yourFeature/yourFeatureSlice.ts`) and add its reducer to the `reducer` object in `src/lib/store.ts`.

*   **`ThemeProvider` (`src/components/common/theme-provider.tsx`)**:
    *   Manages application theming (light/dark mode) using `next-themes`.
    *   Configured in `RootProviders` to use class-based theming (`attribute="class"`) and system preference by default.
    *   Theme styles (CSS variables) are defined in `src/app/globals.css`.

### Adding More Providers:

To add new global providers (e.g., for React Query, additional context APIs):
1.  Create your provider component (e.g., `src/components/common/my-new-provider.tsx`).
2.  Import and wrap it within the `RootProviders` component in `src/components/common/root-providers.tsx`, ensuring the correct nesting order for dependencies between providers.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

© {{CURRENT_YEAR}} {{COMPANY_NAME}} 