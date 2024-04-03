import type { NextApiRequest, NextApiResponse } from 'next';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type { Banner } from '@/types/payload/payload-types';

export default async (
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> => {

    const banner = await getPayloadResponse<Banner>('/api/globals/banner');
    response.status(200).json({ ...banner });
};
