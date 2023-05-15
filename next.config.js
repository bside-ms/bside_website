/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['localhost', 'cms.b-side.ovh'],
  },

  // Needed to build the project as a standalone app inside the Docker image.
  output: 'standalone',
};

module.exports = nextConfig;
