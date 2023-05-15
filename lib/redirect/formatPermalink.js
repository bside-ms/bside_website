// cannot use ts here, for nodejs sitemap and redirects module

module.exports.formatPermalink = (reference, currentCategory) => {
    let permalink = ''

    const { relationTo, value } = reference

    if (typeof value === 'object' && value !== null) {
        const { slug } = value

        if (relationTo === 'pages') {
            permalink = slug
        }
    }

    return permalink
}
