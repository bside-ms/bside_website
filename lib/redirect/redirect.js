/**
 * @typedef ReferenceValue
 * @type {object}
 * @property {string} slug
 */

/**
 * @typedef Reference
 * @type {object}
 * @property {string} relationTo
 * @property {ReferenceValue|string|null} value
 */

/**
 * @param {string} url
 * @returns {string}
 */
const normalizeRedirect = (url) => {
    let normalizedUrl = url;

    if (normalizedUrl.startsWith('http')) {
        return url;
    }

    normalizedUrl = normalizedUrl.replace('?', `\\?`);

    if (normalizedUrl.endsWith('/')) {
        normalizedUrl = normalizedUrl.replace(/\/$/, '');
    }

    return normalizedUrl;
};

/**
 * @param {Reference} reference
 * @returns {string}
 */
const formatPermalink = (reference) => {
    let permalink = '';

    const { relationTo, value } = reference;

    if (typeof value === 'object' && value !== null) {
        const { slug } = value;

        if (relationTo === 'pages') {
            permalink = slug;
        }
    }

    return permalink;
};

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

module.exports = async () => {
    const redirectsRes = await fetch(`${process.env.PAYLOAD_URL}/api/redirects?limit=9999&depth=1`);
    const redirectsData = await redirectsRes.json();

    let { docs } = redirectsData;

    let dynamicRedirects = [];

    if (!docs) {
        return [];
    }

    docs.forEach((doc) => {
        let { from, to: { type, url, reference } = {} } = doc;

        let source = from.replace(process.env.FRONTEND_URL, '').split('?')[0].toLowerCase();
        if (source.endsWith('/')) source = source.slice(0, -1); // a trailing slash would break this redirect

        let destination = '/';

        if (type === 'custom' && url) {
            destination = url.replace(process.env.FRONTEND_URL, '');
        }

        if (type === 'reference' && typeof reference.value === 'object' && reference?.value?._status === 'published') {
            destination = `${process.env.FRONTEND_URL}/${formatPermalink(reference)}`;
        }

        source = normalizeRedirect(source);
        destination = normalizeRedirect(destination);

        const redirect = {
            source,
            destination,
            permanent: false,
        };

        if (source.startsWith('/') && destination && source !== destination) {
            if (!dynamicRedirects.find((dynamicRedirect) => dynamicRedirect.source === source)) {
                console.log('Redirects - Created:', source, 'to', destination);
                return dynamicRedirects.push(redirect);
            } else {
                console.error('Redirects - Invalid Duplicate:', source, 'to', destination);
            }
        }
    });

    return [internetExplorerRedirect, ...dynamicRedirects, ...staticRedirects];
};
