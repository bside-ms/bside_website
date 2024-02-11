import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import FrontPageHero from '@/components/frontPage/FrontPageHero';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getUpcomingEvents } from '@/lib/events';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event, Page, StartPage } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    events: Array<Event>;
    page: Page;
    homePage: StartPage;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>(`/api/pages/?where[slug][equals]=home&locale=${locale}`);
    const page = pagesResponse.docs[0];

    const indexResponse = await getPayloadResponse<StartPage>(`/api/globals/start-page/?locale=${locale}`);

    if (page === undefined) {
        return { notFound: true };
    }

    return {
        revalidate: 60,
        props: {
            page,
            homePage: indexResponse,
            events: await getUpcomingEvents(5, 'Home'),
            locale,
        },
    };
};

export default ({ page, events, homePage }: Props): ReactElement => {

    return (
        <div className="min-h-screen flex flex-col justify-between">

            <NextHead />

            <HeaderBar />

            <main id="content">
                <FrontPageHero title={homePage.title} textBody={homePage.textBody} buttonText={homePage.buttonText} />

                <div className="py-2" />

                <ReusableBlockLayout
                    layout={page.layout}
                    events={events}
                />

            </main>

            <Footer />
        </div>
    );
};
