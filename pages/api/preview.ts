// simple example for testing it manually from your browser.
import * as process from 'process';
import type { NextApiRequest, NextApiResponse } from 'next';

const destroy = (res: NextApiResponse): void => {
    res.clearPreviewData();
    res.end('Preview mode disabled');
};

export default (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.query.secret === 'destroy') {
        destroy(res); return;
    }

    if (req.query.secret !== process.env.PREVIEW_TOKEN) {
        res.status(401).json({ message: 'Invalid token' }); return;
    }

    res.setPreviewData({
        duration: 60 * 60,
    });
    res.end('Preview mode enabled');
};
