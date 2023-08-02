import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import CultureAndEducation from '@/components/cultureAndEducation/CultureAndEducation';
import ContentDivider from '@/components/Layout/ContentDivider';
import HeaderBar from '@/components/Layout/Header/HeaderBar';
import { getUpcomingEvents } from '@/lib/events';
import type { Event } from '@/types/payload/payload-types';

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

export default ({ events }: Props): ReactElement => {

    const metaTitle = 'Kultur e.V. | B-Side';

    return (
        <Fragment>
            <Head>
                <title>{metaTitle}</title>
                <meta property="og:title" content={metaTitle} key="title" />
                <meta name="apple-mobile-web-app-title" content={metaTitle} />
                <meta name="twitter:title" content={metaTitle} />
            </Head>
            <main className="min-h-screen flex flex-col justify-between">
                <HeaderBar />

                <ContentDivider />

                <CultureAndEducation events={events} />

                <Footer />
            </main>

        </Fragment>
    );
};
