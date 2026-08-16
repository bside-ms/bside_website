// Fixed ISR routes rebuilt on every POST /api/revalidate (German plus /en).
// Dynamic slugs (events, news, circles, CMS pages) are not listed here and stay on the 60s ISR timer.
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
    if (path === '/') {
        return ['/', '/en'];
    }

    return [path, `/en${path}`];
};

export const revalidatePaths: Array<string> = pagePaths.flatMap(withEnglish);
