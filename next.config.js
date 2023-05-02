/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['localhost', process.env.PAYLOAD_URL],
  },

  // Needed to build the project as a standalone app inside the Docker image.
  output: 'standalone',
};

module.exports = nextConfig;
