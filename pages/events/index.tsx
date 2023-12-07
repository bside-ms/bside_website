import { useLivePreview } from '@payloadcms/live-preview-react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import HeroImageSvg from '@/components/common/HeroImageSvg';
import ContentDivider from '@/components/layout/ContentDivider';
import HeaderBar from '@/components/layout/header/HeaderBar';
import { getUpcomingEvents } from '@/lib/events';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import heroImage from '@/public/assets/stickFigures/Veranstaltungen.svg';
import type { Event, EventPage } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    events: Array<Event>;
    page: EventPage;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const allEvents = await getUpcomingEvents(0, 'Overview');
    const page = await getPayloadResponse<EventPage>(`/api/globals/event-page/?locale=${locale}`);

    return {
        revalidate: 60,
        props: {
            events: allEvents,
            page,
            locale,
        },
    };
};

export default ({ events, page }: Props): ReactElement => {
    const { locale } = useRouter();

    const { data: pageData } = useLivePreview({
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
        depth: 1,
        initialData: page,
    });

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <HeaderBar />
            <ContentDivider />

            <main id="content">
                <HeroImageSvg
                    imageSrc={heroImage}
                    imageAlt=""
                    title={locale === 'de' ? 'Veranstaltungen' : 'Events'}
                />

                <ReusableBlockLayout
                    layout={pageData.layout}
                    events={events}
                />
            </main>

            <Footer />
        </div>
    );
};
