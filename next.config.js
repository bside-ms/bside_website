const redirects = require('./lib/redirect/redirect')

/** @type {import('next').NextConfig} */
const path = require('path')

function isProduction() {
  return process.env.NODE_ENV === 'production';
}



const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      'localhost',
      'cms.b-side.ovh',
      'cms.b-side.ms',
    ],
    minimumCacheTTL: 60 * 60 * 24,
    formats: ['image/avif', 'image/webp'],
  },

  // ToDo: Test.
  staticPageGenerationTimeout: 60 * 3 * 10,

  // Needed to build the project as a standalone app inside the Docker image.
  output: 'standalone',

  redirects,
};

module.exports = nextConfig;
