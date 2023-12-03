import { useLivePreview } from '@payloadcms/live-preview-react';
import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/layout/ContentDivider';
import HeaderBar from '@/components/layout/header/HeaderBar';
import { getPastEvents } from '@/lib/events';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type { Event, EventArchive, Media } from '@/types/payload/payload-types';
import HeadlineBlock from '@blocks/headlineBlock/HeadlineBlock';
import MediaBlock from '@blocks/mediaBlock/MediaBlock';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    events: Array<Event>;
    page: EventArchive;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const events = await getPastEvents(9999);
    const page = await getPayloadResponse<EventArchive>(`/api/globals/event-archive/?locale=${locale}`);

    return {
        revalidate: 60,
        props: {
            events,
            page,
            locale,
        },
    };
};

export default ({ events, page }: Props): ReactElement => {
    const archivText = 'Auf dieser Seite findest du ein paar der Veranstaltungen, die in der letzten Zeit bei uns stattgefunden haben.';

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
                <MediaBlock
                    size="wide"
                    media={pageData.headerImage as Media}
                />
                <HeadlineBlock
                    title={pageData.title}
                    level="h1"
                />
                <div className="my-6" />

                <ReusableBlockLayout
                    layout={pageData.layout}
                    events={events}
                />
            </main>

            <Footer />
        </div>
    );
};
