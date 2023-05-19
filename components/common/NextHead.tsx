import Head from 'next/head';
import type { ReactElement } from 'react';

const NextHead = (): ReactElement => {

    const title = 'B-Side Münster';
    const description = 'Selbstorganisierter und offener Ort der Möglichkeiten am Münsteraner Hafen';

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
            <link rel="apple-touch-icon" href="/favicon-512.png" />
            <link rel="shortcut icon" href="/favicon.ico" />

            <meta property="og:title" content={title} key="title" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="de_DE" />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={title} />
            <meta property="og:url" content="https://yourdomain.com" />
            <meta property="og:image" content="https://b-side.ovh/favicon-512.png" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content="https://b-side.ms" />
            <meta name="twitter:title" content="B-Side Münster" />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content="https://b-side.ovh/favicon-512.png" />

        </Head>
    );
};

export default NextHead;
