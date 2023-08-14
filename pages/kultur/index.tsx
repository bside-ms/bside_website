import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import CultureAndEducation from '@/components/cultureAndEducation/CultureAndEducation';
import Banner from '@/components/layout/Banner';
import ContentDivider from '@/components/layout/ContentDivider';
import HeaderBar from '@/components/layout/header/HeaderBar';
import { getUpcomingEvents } from '@/lib/events';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    events: Array<Event>;
    preview: boolean;
}

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
    return {
        revalidate: 60,
        props: {
            events: await getUpcomingEvents(),
            preview: preview ?? false,
        },
    };
};

export default ({ events, preview }: Props): ReactElement => {

    const metaTitle = 'Kultur e.V. | B-Side';

    return (
        <Fragment>
            <Head>
                <title>{metaTitle}</title>
                <meta property="og:title" content={metaTitle} key="title" />
                <meta name="apple-mobile-web-app-title" content={metaTitle} />
                <meta name="twitter:title" content={metaTitle} />
            </Head>

            <div className="min-h-screen flex flex-col justify-between">
                <HeaderBar />

                {preview && (
                    <Banner
                        bannerId="preview"
                        bannerText="Preview"
                        bannerLink=""
                        footerInView={false}
                        isPreview={true}
                    />
                )}

                <ContentDivider />

                <main>
                    <CultureAndEducation events={events} />
                </main>

                <Footer />
            </div>

        </Fragment>
    );
};
