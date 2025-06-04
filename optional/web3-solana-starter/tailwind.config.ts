import type { Config } from "tailwindcss";

const config = {
    darkMode: ['class'],
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  
    theme: {
      extend: {
        container: {
          padding: '1rem',
          center: true,
        },
        backgroundImage: {
          headerGradient: 'linear-gradient(#fcfcfc7f, #fcfcfc7f 63%, #f2f2f200)',
          footerGradientLight:
            'linear-gradient(0deg, rgb(182, 240, 182, 0.1), rgb(148, 216, 115, 0.05))',
          footerGradientDark:
            'linear-gradient(0deg, rgb(26, 77, 26, 0.1), rgb(30, 41, 59, 0.05))',
          dividerGradient: 'linear-gradient(90deg, #eaf9e2, #94d873, #eaf9e2)',
          sectionHeaderGradient:
            'linear-gradient(#fcfcfc7f, #fcfcfc7f 63%, #f2f2f200)',
          fogGradientLight:
            'linear-gradient(0deg, rgba(182, 240, 182, 0.1), rgba(255, 255, 255, 0.05))',
          fogGradientDark:
            'linear-gradient(0deg, rgba(26, 77, 26, 0.1), rgba(15, 23, 42, 0.05))',
          gradient1: 'linear-gradient(#86A0DF26, #E2F9D74c 30%, #FCFCFC)',
          gradient2:
            'linear-gradient(#86a0df00, #86a0df33 34%, #e2f9d7 53%, #fcfcfc)',
          gradient3: 'linear-gradient(#fcfcfce0 69%, #fcfcfca0 84%, #f8f8f800)',
          gradient4:
            'linear-gradient(#86a0df00, #94d873 27%, #86a0df 67%, #94d87300)',
          gradientOurTeam:
            'linear-gradient(#86A0DF00, #94D87302 32%, #86A0DF02 67%, #94D87300)',
          gradientJoinUs:
            'linear-gradient(#86A0DF00, #94D87302 32%, #86A0DF02 67%, #94D87300)',
          gradientHeaderCircle:
            'linear-gradient(180deg, rgba(242, 242, 239, 0.5) 0%, rgba(252, 252, 252, 0.5) 38%);',
          'custom-gradient':
            'linear-gradient(to right, #DDE0E3 50%, #333438 50%)',
        },
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          secondary: 'var(--secondary)',
          muted: {
            DEFAULT: 'var(--muted)',
            foreground: 'var(--muted-foreground)',
          },
          primary: {
            DEFAULT: '#94d873',
            light: '#e1f8d8',
            dark: '#1a4d1a',
            fog: {
              light: '#b6f0b6',
              DEFAULT: '#94d873',
              dark: '#1a4d1a',
              darkMid: '#1e293b',
              darkLow: '#4a2617',
              darkBase: '#0f172a',
            },
          },
          gray: {
            DEFAULT: '#73757A',
            light: '#DDE0E3',
            compute: '#333438',
            button: '#F4FAF2',
          },
          error: {
            DEFAULT: 'var(--error)',
            light: 'var(--error-light)',
          },
          success: {
            DEFAULT: 'var(--success)',
            light: 'var(--success-light)',
          },
        },
        keyframes: {
          'accordion-down': {
            from: {
              height: '0',
            },
            to: {
              height: 'var(--radix-accordion-content-height)',
            },
          },
          'accordion-up': {
            from: {
              height: 'var(--radix-accordion-content-height)',
            },
            to: {
              height: '0',
            },
          },
          'underscore-load': {
            '0%': {
              opacity: '0',
              transform: 'translateX(-20px)',
            },
            '100%': {
              opacity: '1',
              transform: 'translateX(0)',
            },
          },
          'underscore-move': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(100%)' },
          },
          'loader-rotate': {
            '0%': { transform: 'rotate(0deg)' },
            '80%': { transform: 'rotate(350deg)' },
            '100%': { transform: 'rotate(0deg)' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          underscoreLoad: 'underscore-load 0.5s ease-out forwards',
          'underscore-move': 'underscore-move 20s linear infinite',
          'loader-rotate': 'loader-rotate 4.5s ease-in-out infinite',
        },
      },
    },
    plugins: [require('tailwindcss-animate')],
  } satisfies Config;

export default config; 