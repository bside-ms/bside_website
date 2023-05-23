// cannot use ts here, for nodejs sitemap and redirects module

const permalinks = require('./formatPermalink');
const { formatPermalink } = permalinks;

function normalizeRedirect(url) {
    let normalizedUrl = url;

    if (normalizedUrl.startsWith('http')) {
        return url;
    }

    normalizedUrl = normalizedUrl.replace('?', `\\?`);

    if (normalizedUrl.endsWith('/')) {
        normalizedUrl = normalizedUrl.replace(/\/$/, '');
    }

    return normalizedUrl;
}

module.exports = async () => {

    const staticRedirects = [
        {
            source: '/bio',
            destination: 'https://linktr.ee/bsidems',
            permanent: false,
        },
    ];

    const internetExplorerRedirect = {
        source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
        has: [
            {
                type: 'header',
                key: 'user-agent',
                value: '(.*Trident.*)', // all ie browsers
            },
        ],
        permanent: false,
        destination: '/ie-incompatible.html',
    };

    const redirectsRes = await fetch(
        `${process.env.PAYLOAD_URL}/api/redirects?limit=1000&depth=1`,
    );
    const redirectsData = await redirectsRes.json();

    let { docs } = redirectsData;

    let dynamicRedirects = [];

    if (!docs) {
        return [];
    }

    docs.forEach(doc => {
        let { from, to: { type, url, reference } = {} } = doc;

        let source = from.replace(process.env.FRONTEND_URL, '').split('?')[0].toLowerCase();
        if (source.endsWith('/')) source = source.slice(0, -1); // a trailing slash would break this redirect

        let destination = '/';

        if (type === 'custom' && url) {
            destination = url.replace(process.env.FRONTEND_URL, '')
        }

        if (
            type === 'reference' &&
            typeof reference.value === 'object' &&
            reference?.value?._status === 'published'
        ) {
            destination = `${process.env.FRONTEND_URL}/${formatPermalink(reference)}`
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

    return [internetExplorerRedirect, ...dynamicRedirects, ...staticRedirects]
};
