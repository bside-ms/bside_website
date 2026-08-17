// Fixed ISR routes rebuilt on every POST /api/revalidate (German plus /en).
// The CMS can send extra dynamic slugs (events, news, circles, pages) in the request body.
const pagePaths: Array<string> = [
    '/',
    '/bside',
    '/bside/kollektiv',
    '/kultur',
    '/kultur/spenden',
    '/kultur/festival/spenden',
    '/kultur/hansawerkstatt/spenden',
    '/kultur/hansawerkstatt/alles-auf-neu',
    '/quartier',
    '/events',
    '/events/history',
    '/news',
    '/kontakt',
];

const withEnglish = (path: string): Array<string> => {
    if (path === '/' || path === '/en') {
        return ['/', '/en'];
    }

    if (path.startsWith('/en/')) {
        return [path];
    }

    return [path, `/en${path}`];
};

export const revalidatePaths: Array<string> = pagePaths.flatMap(withEnglish);

const extraPathsFromBody = (body: unknown): Array<string> => {
    if (typeof body !== 'object' || body === null) {
        return [];
    }

    const { paths } = body as { paths?: unknown };

    if (!Array.isArray(paths)) {
        return [];
    }

    return paths
        .filter((path): path is string => typeof path === 'string' && path.startsWith('/') && !path.startsWith('//'))
        .flatMap(withEnglish);
};

export const pathsToRevalidate = (body: unknown): Array<string> => Array.from(new Set(revalidatePaths.concat(extraPathsFromBody(body))));
