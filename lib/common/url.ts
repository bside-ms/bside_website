const validHostnames = [
    'b-side.ovh',
    'b-side.ms',
    'cms.b-side.ovh',
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

export const getFullClientUrl = (path: string): string => `${process.env.NEXT_PUBLIC_FRONTEND_URL}${path}`;

export const getPublicClientUrl = (): string => process.env.NEXT_PUBLIC_FRONTEND_URL;

export const getPublicPayloadUrl = (path: string): string => `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${path}`;
