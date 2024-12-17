const validHostnames = [
    'b-side.ms',
    'staging.b-side.ms',
    'cms.b-side.ms',
    'localhost:3001',
    'localhost:3000',
];

export const isValidBsideUrl = (string: string): boolean => {
    try {
        const url = new URL(string);

        return validHostnames.includes(url.host);
    } catch {
        return false;
    }
};

export const getFullClientUrl = (path: string): string =>
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}${path}`;

export const getPublicClientUrl = (locale?: string): string => {
    if (locale === 'de') {
        return process.env.NEXT_PUBLIC_FRONTEND_URL;
    }

    return `${process.env.NEXT_PUBLIC_FRONTEND_URL}/en`;
};

export const getPublicPayloadUrl = (path: string): string =>
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${path}`;

export const processSlug = (rawSlug: string | Array<string> | undefined): string => {
    if (rawSlug === undefined) {
        return '';
    }

    return typeof rawSlug === 'string' ? rawSlug : rawSlug.join('/');
};
