import type { NextApiRequest, NextApiResponse } from 'next';
import getQueryParam from '@/lib/common/helper/getQueryParam';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type { Banner } from '@/types/payload/payload-types';

export default async (
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> => {
    const lang = getQueryParam(request, 'lang') ?? 'de';
    const banner = await getPayloadResponse<Banner>(`/api/globals/banner?locale=${lang}`);
    response.status(200).json({ ...banner });
};
