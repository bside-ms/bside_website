// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
    generateRobotsTxt: false,
    generateIndexSitemap: false,
    exclude: [
        '*',
        '/server-sitemap.xml', // This is included in the robotsTxtOptions.
        '/kreise/*',

        // pages with layouts
        '/kultur',
        '/quartier',
        '/bside/*',

        // pages with events
        '/events/!history',
    ],
    robotsTxtOptions: {
        additionalSitemaps: [
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/server-sitemap.xml`,
        ],
    },
}
