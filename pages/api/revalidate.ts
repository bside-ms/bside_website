import type { NextApiRequest, NextApiResponse } from 'next';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { revalidatePaths } from '@/lib/revalidate/corePaths';

interface RevalidateResult {
    path: string;
    revalidated: boolean;
    error?: string;
}

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        response.status(405).json({ message: 'Method not allowed.' });
        return;
    }

    const expectedSecret = process.env.REVALIDATION_KEY;
    const header = request.headers['x-revalidation-key'];
    const providedSecret = typeof header === 'string' ? header : undefined;

    if (isEmptyString(expectedSecret)) {
        response.status(503).json({ message: 'Service unavailable. Revalidation key is not set.' });
        return;
    }

    if (providedSecret !== expectedSecret) {
        response.status(401).json({ message: 'Unauthorized.' });
        return;
    }

    const results: Array<RevalidateResult> = [];

    for (const path of revalidatePaths) {
        try {
            await response.revalidate(path);
            results.push({ path, revalidated: true });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown revalidation error';
            results.push({ path, revalidated: false, error: message });
        }
    }

    const failed = results.filter((result) => !result.revalidated);
    response.status(failed.length === results.length ? 500 : 200).json({
        revalidated: failed.length === 0,
        results,
    });
};
