import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { HeadlineBlock } from '@/components/Blocks/Headline';
import ContentDivider from '@/components/Layout/ContentDivider';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import { getUpcomingEvents } from '@/lib/events';
import Footer from 'components/common/Footer';
import HeaderBarContainer from 'components/Layout/Header/HeaderBarContainer';
import type { Event } from 'types/payload/payload-types';

interface Props {
    events: Array<Event>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        revalidate: 60,
        props: {
            events: await getUpcomingEvents(),
        },
    };
};

export default (): ReactElement => {

    const metaTitle = 'GmbH | B-Side';

    return (
        <Fragment>
            <Head>
                <title>{metaTitle}</title>
                <meta property="og:title" content={metaTitle} key="title" />
                <meta name="apple-mobile-web-app-title" content={metaTitle} />
                <meta name="twitter:title" content={metaTitle} />
            </Head>

            <main className="min-h-screen flex flex-col justify-between">
                <HeaderBarContainer />

                <ContentDivider />

                <ContentWrapper>
                    <HeadlineBlock
                        title="B-Side GmbH"
                        level="h1"
                        anchor=""
                        teaser=""
                    />
                </ContentWrapper>

                <Footer />
            </main>
        </Fragment>
    );
};
