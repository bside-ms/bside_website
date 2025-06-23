import type { NextApiRequest, NextApiResponse } from 'next';
import isEmptyString from '@/lib/common/helper/isEmptyString';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    res.setHeader('Cache-Control', 'no-cache');

    const { s } = req.query;
    const query = s as string;

    if (isEmptyString(process.env.NEXT_PUBLIC_MATOMO_SITE_ID) || isEmptyString(process.env.NEXT_PUBLIC_MATOMO_ENDPOINT)) {
        res.status(200).send({ message: 'OK' });
    }

    // Use the SSR SiteID.
    const sideId = Number(process.env.NEXT_PUBLIC_MATOMO_SITE_ID) + 1;
    const requestUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${query}`;

    await fetch(`${process.env.NEXT_PUBLIC_MATOMO_ENDPOINT}/lernen.php?rec=1&idsite=${sideId}&url=${requestUrl}`);

    res.status(200).send({ message: 'OK' });
};
