const redirects = require('./lib/redirect/redirect')

/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      'localhost',
      'cms.b-side.ovh',
      'cms.b-side.ms',
    ],
  },

  // Needed to build the project as a standalone app inside the Docker image.
  output: 'standalone',

  redirects,
};

module.exports = nextConfig;
