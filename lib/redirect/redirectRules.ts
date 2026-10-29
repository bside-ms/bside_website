export interface RedirectDoc {
    from?: string;
    to?: {
        type?: string;
        url?: string | null;
        reference?: {
            relationTo?: string;
            value?: { slug?: string; _status?: string } | string | null;
        } | null;
    };
}

export type RedirectRules = Map<string, string>;

const stripTrailingSlash = (path: string): string => (path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path);

/** Lower-case, no query string, no trailing slash. Used for both the CMS `from` and the request path. */
export const normalizeRedirectPath = (path: string): string => stripTrailingSlash((path.split('?')[0] ?? '').toLowerCase());

const removeOrigin = (url: string, origin: string): string => (origin !== '' && url.startsWith(origin) ? url.slice(origin.length) : url);

const resolveDestination = (doc: RedirectDoc, origin: string): string | undefined => {
    const { type, url, reference } = doc.to ?? {};

    if (type === 'custom' && url) {
        const destination = removeOrigin(url, origin);

        return destination.startsWith('http') ? destination : stripTrailingSlash(destination);
    }

    if (type === 'reference' && reference?.relationTo === 'pages') {
        const value = reference.value;

        if (typeof value === 'object' && value !== null && value._status === 'published' && value.slug) {
            return `/${value.slug}`;
        }
    }

    return undefined;
};

/** Builds a lookup of normalized source path -> destination (path or absolute URL). */
export const buildRedirectRules = (docs: Array<RedirectDoc>, origin: string): RedirectRules => {
    const rules: RedirectRules = new Map();

    for (const doc of docs) {
        if (!doc.from) {
            continue;
        }

        const source = normalizeRedirectPath(removeOrigin(doc.from, origin));
        const destination = resolveDestination(doc, origin);

        if (!source.startsWith('/') || destination === undefined || source === normalizeRedirectPath(destination) || rules.has(source)) {
            continue;
        }

        rules.set(source, destination);
    }

    return rules;
};
