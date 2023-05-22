// Allowed hostnames for URLs
const HOSTNAMES: Array<string> = [
    'b-side.ovh',
    'b-side.ms',
    'cms.b-side.ovh',
    'cms.b-side.ms',
    'localhost:3001',
    'localhost:3000',
];

export function isValidUrl(string: string): boolean {
    try {
        return !!new URL(string);
    } catch {
        return false;
    }
}

export function isValidBsideUrl(string: string): boolean {
    const url = new URL(string);

    return (
        isValidUrl(string) && HOSTNAMES.includes(url.host)
    );
}

export function getFullCMSUrl(path: string): string {
    return `${process.env.PAYLOAD_URL}${path}`;
}

export function getFullClientUrl(path: string): string {
    return `${process.env.FRONTEND_URL}${path}`;
}
