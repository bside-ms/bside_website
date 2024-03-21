import type { NextApiRequest } from 'next';

const getQueryParam = <T = string>(request: NextApiRequest, key: string): T | undefined => {

    const queryValue = request.query[key];

    if (typeof queryValue === 'string' && queryValue !== '') {
        return queryValue as T;
    }

    return undefined;
};

export default getQueryParam;
