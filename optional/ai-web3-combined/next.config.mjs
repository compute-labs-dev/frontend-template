import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const config = {
  // your existing config
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // Add back shader file handling for Three.js
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });

    return config;
  },
  images: {
    domains: ['computelabs-dashboard.vercel.app'],
  },
  // Add back Three.js specific configurations
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  experimental: {
    optimizePackageImports: ['three'],
  },
  output: 'standalone',
};

export default withNextIntl(config);

  // org: 'compute-labs',
  // project: 'dashboard-frontend',

  // Only print logs for uploading source maps in CI
  // silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  // widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  // reactComponentAnnotation: {
  //   enabled: true,
  // },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  // hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  // disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
//   automaticVercelMonitors: true,
// };