/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

const path = require('path');

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=()',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
];

module.exports = {
  ...nextConfig,
  output: 'standalone',
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  experimental: {
    outputStandalone: true,
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  images: {
    domains: ['api-stage.gute.tech', 'api.gute.tech'],
  },
  esmExternals: 'loose',
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
