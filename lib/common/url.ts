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

export const getFullClientUrl = (path: string): string => `${process.env.FRONTEND_URL}${path}`;
