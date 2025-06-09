const redirects = require('./lib/redirect/redirect');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cms.b-side.ms',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**',
            },
        ],
        minimumCacheTTL: 60 * 60 * 24,
        formats: ['image/webp', 'image/avif'],
    },

    i18n: {
        locales: ['de', 'en'],
        defaultLocale: 'de',
        localeDetection: false,
    },

    staticPageGenerationTimeout: 60 * 3 * 10,

    // Needed to build the project as a standalone app inside the Docker image.
    output: 'standalone',

    experimental: {
        scrollRestoration: true,
    },

    redirects,

    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/kollektiv/:slug',
                    destination: '/kreise/:slug',
                },
                {
                    source: '/kultur/:slug((?!impressum|spenden|hansawerkstatt/spenden).*)',
                    destination: '/kreise/:slug',
                },
                {
                    source: '/quartier/:slug((?!unterstuetzen).*)',
                    destination: '/kreise/:slug',
                },
            ],
            afterFiles: [],
            fallback: [],
        };
    },
};

module.exports = nextConfig;
