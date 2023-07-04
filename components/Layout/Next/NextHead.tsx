import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { getFullClientUrl } from '@/lib/common/url';

const NextHead = (): ReactElement => {

    const title = 'B-Side Münster';
    const description = 'Selbstorganisierter und offener Ort der Möglichkeiten am Münsteraner Hafen';

    const { asPath } = useRouter();

    return (
        <Head>
            <title>{title}</title>

            <meta name="application-name" content={title} />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content={title} />
            <meta name="description" content={description} />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />

            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="/android-chrome-512x512.png" sizes="512x512" />
            <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192" />

            <meta property="og:title" content={title} key="title" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="de_DE" />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={title} />
            <meta property="og:url" content="https://b-side.ms" />
            <meta property="og:image" content={getFullClientUrl(`/api/screenshot?url=${getFullClientUrl(asPath)}`)} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content="https://b-side.ms" />
            <meta name="twitter:title" content="B-Side Münster" />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={getFullClientUrl(`/api/screenshot?url=${getFullClientUrl(asPath)}`)} />

        </Head>
    );
};

export default NextHead;
