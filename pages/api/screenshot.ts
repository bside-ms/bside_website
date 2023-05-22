// eslint-disable-next-line simple-import-sort/imports
import type { NextApiRequest, NextApiResponse } from 'next';

import * as puppeteer from 'puppeteer';
import { isValidBsideUrl } from '../../lib/url';

async function getBrowserInstance(): Promise<puppeteer.Browser> {
    return puppeteer.launch({
        args: ['--no-sandbox'],
        headless: 'new',
        defaultViewport: {
            width: 1200,
            height: 600,
        },
    });
}

async function takeScreenshot(url: string): Promise<Buffer> {
    let browser = null;

    try {
        browser = await getBrowserInstance();

        const page = await browser.newPage();

        await page.goto(url);

        await page.evaluate(() => {
            (document.querySelector('#ical-link')! as HTMLElement).style.display = 'none';
        });

        const screenshot = await page.screenshot({ type: 'png' });
        await page.close();

        return screenshot;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { query } = req;
    const url = query.url as string;

    try {
        if (url && isValidBsideUrl(url)) {
            const screenshot = await takeScreenshot(url);
            const maxAge = 60 * 60 * 24;

            if (!screenshot) {
                throw new Error('Screenshot could not be generated.');
            }

            res.setHeader('Cache-Control', `max-age=${maxAge}, public`);
            res.setHeader('Content-Type', 'image/png');
            res.status(200).send(screenshot);
        } else {
            throw new Error(
                'Either the url parameter wasn\'t passed of the URL is not allowed to be screenshotted.'
            );
        }
    } catch (error) {
        res.status(500).send(JSON.stringify((error as Error).message));
    }

    res.status(500);
}
