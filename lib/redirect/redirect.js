// cannot use ts here, for nodejs sitemap and redirects module

const permalinks = require('./formatPermalink')
const { formatPermalink } = permalinks

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
    }

    const redirectsRes = await fetch(
        `${process.env.PAYLOAD_URL}/api/redirects?limit=1000&depth=1`,
    )
    const redirectsData = await redirectsRes.json()

    const { docs } = redirectsData

    let dynamicRedirects = []

    if (docs) {
        docs.forEach(doc => {
            const { from, to: { type, url, reference } = {} } = doc

            let source = from.replace(process.env.FRONTEND_URL, '').split('?')[0].toLowerCase()

            if (source.endsWith('/')) source = source.slice(0, -1) // a trailing slash will break this redirect

            let destination = '/'

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

            const redirect = {
                source,
                destination,
                permanent: false,
            }

            if (source.startsWith('/') && destination && source !== destination) {
                return dynamicRedirects.push(redirect)
            }

            return;
        })
    }

    const redirects = [internetExplorerRedirect, ...dynamicRedirects, ...staticRedirects]

    return redirects
}
