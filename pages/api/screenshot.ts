import type { NextApiRequest, NextApiResponse } from 'next';
import * as puppeteer from 'puppeteer';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import { isValidBsideUrl } from '@/lib/common/url';

const getBrowserInstance = async (): Promise<puppeteer.Browser> =>
    puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true,
        defaultViewport: {
            width: 1200,
            height: 600,
        },
    });

const takeScreenshot = async (url: string): Promise<Buffer | null> => {
    let browser = null;

    try {
        browser = await getBrowserInstance();

        const page = await browser.newPage();
        await page.goto(url);
        await page.waitForNetworkIdle();

        // Dismiss all banners.
        await page.evaluate(() => {
            const banners = document.querySelectorAll<HTMLElement>('[id^="banner__"]');

            banners.forEach((banner) => {
                banner.style.display = 'none';
            });
        });

        // Create the screenshot.
        const screenshot = await page.screenshot({ type: 'png' });
        await page.close();

        return screenshot;
    } finally {
        if (browser) {
            await browser.close();
        }
    }

    return null;
};

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
    const { url } = request.query as { url?: string };

    try {
        if (isNotEmptyString(url) && isValidBsideUrl(url)) {
            const screenshot = await takeScreenshot(url);
            const maxAge = 60 * 60 * 24;

            if (!screenshot) {
                throw new Error('Screenshot could not be generated.');
            }

            response.setHeader('Cache-Control', `max-age=${maxAge}, public`);
            response.setHeader('Content-Type', 'image/png');
            response.status(200).send(screenshot);
        } else {
            throw new Error(
                "Either the URL parameter wasn't passed or the URL is not allowed to be screenshot.",
            );
        }
    } catch (error) {
        response.status(500).send({ error });
    }

    response.status(500);
};
