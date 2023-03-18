import Head from 'next/head';
import type { ReactElement } from 'react';

const NextHead = (): ReactElement => {

    const title = 'Der B-Side Kultur e.V. am Münsteraner Mittelhafen';

    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} key="title" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="de_DE" />
        </Head>
    );
};

export default NextHead;
