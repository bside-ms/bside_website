import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { getFullClientUrl } from '@/lib/common/url';

interface Props {
    title?: string;
    description?: string;
    url?: string;
}

const NextHead = ({ title, description, url }: Props): ReactElement => {
    title = !isEmptyString(title) ? title : 'B-Side Münster';
    description = !isEmptyString(description) ? description : 'Selbstorganisierter und offener Ort der Möglichkeiten am Münsteraner Hafen';

    const { asPath } = useRouter();
    url = !isEmptyString(url) ? url : getFullClientUrl(asPath);

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
            <link rel="icon" type="image/png" href="/favicon-512.png" sizes="512x512" />
            <link rel="icon" type="image/png" href="/favicon-192.png" sizes="192x192" />

            <link rel="canonical" href={url} key="canonical" />

            <meta property="og:title" content={title} key="title" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="de_DE" />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={title} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={getFullClientUrl(`/api/screenshot?url=${getFullClientUrl(asPath)}`)} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={getFullClientUrl(`/api/screenshot?url=${getFullClientUrl(asPath)}`)} />
        </Head>
    );
};

export default NextHead;
