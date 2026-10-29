const staticRedirects = [
    {
        source: '/bio',
        destination: 'https://linktr.ee/bsidems',
        permanent: false,
    },
];

const internetExplorerRedirect = {
    source: '/:path((?!ie-incompatible.html$).*)', // All pages except the incompatibility page
    has: [
        {
            type: 'header',
            key: 'user-agent',
            value: '(.*Trident.*)', // All IE browsers
        },
    ],
    permanent: false,
    destination: '/ie-incompatible.html',
};

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

    // Redirects from the CMS are handled at request time in `middleware.ts`.
    async redirects() {
        return [internetExplorerRedirect, ...staticRedirects];
    },

    async rewrites() {
        return {
            beforeFiles: [
                {
                    source: '/kollektiv/:slug',
                    destination: '/kreise/:slug',
                },
                {
                    source: '/kultur/:slug((?!impressum|spenden|hansawerkstatt/spenden|festival/spenden|hansawerkstatt/alles-auf-neu).*)',
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
