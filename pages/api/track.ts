// @ts-expect-error No types available yet.
// eslint-disable-next-line simple-import-sort/imports
import Matomo from 'matomo-tracker';
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const tracker = new Matomo(process.env.MATOMO_SITE_ID, process.env.MATOMO_ENDPOINT, true);

    if (tracker === null) {
        return;
    }

    const { url } = req.query;
    const query = url as string;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    tracker.track(`${process.env.NEXT_PUBLIC_FRONTEND_URL}${query}`);

    res.send({});
};
