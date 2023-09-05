import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import { useInView } from 'react-intersection-observer';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import Footer from '@/components/common/Footer';
import FrontPageHero from '@/components/frontPage/FrontPageHero';
import Banner from '@/components/layout/Banner';
import ContentDivider from '@/components/layout/ContentDivider';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getUpcomingEvents } from '@/lib/events';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event, Page } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    events: Array<Event>;
    preview: boolean;
    page: Page;
}

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>('/api/pages/?where[slug][equals]=home');
    const page = pagesResponse.docs[0];

    if (page === undefined) {
        return { notFound: true };
    }

    return {
        revalidate: 60,
        props: {
            page,
            events: await getUpcomingEvents(5, 'Home'),
            preview: preview ?? false,
        },
    };
};

export default ({ page, events, preview }: Props): ReactElement => {

    const { isLg } = useBreakpointContext();

    const { ref: inViewFooterRef, inView: isFooterInView } = useInView({
        initialInView: true,
        threshold: 1,
    });

    return (
        <div className="min-h-screen flex flex-col justify-between">

            <NextHead />
            <HeaderBar />

            {preview && (
                <Banner
                    bannerId="index"
                    bannerText="Hinweis | Hinweis | Hinweis"
                    bannerLink=""
                    footerInView={isFooterInView || preview}
                    isPreview={preview}
                />
            )}

            <Banner
                bannerId="index"
                bannerText=">> B-Side Festival 2023 <<"
                bannerLink="https://festival.b-side.ms"
                footerInView={isFooterInView || preview}
                isPreview={preview}
            />

            <ContentDivider />

            <main id="content">
                <FrontPageHero />

                <div className="py-2" />

                <ReusableBlockLayout
                    layout={page.layout}
                    events={events}
                />

            </main>

            <Footer>
                <div ref={inViewFooterRef} />
            </Footer>
        </div>
    );
};
