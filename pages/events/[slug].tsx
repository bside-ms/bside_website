import { useLivePreview } from '@payloadcms/live-preview-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import EventButtons from '@/components/events/detail/EventButtons';
import EventDetails from '@/components/events/detail/EventDetails';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { processSlug } from '@/lib/common/url';
import createEventSlug from '@/lib/events/createEventSlug';
import fetchAllEvents from '@/lib/events/fetchAllEvents';
import fetchEventByIdentifier from '@/lib/events/fetchEventByIdentifier';
import fetchEventBySlug from '@/lib/events/fetchEventBySlug';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    initialEvent: Event;
}

export const getStaticPaths: GetStaticPaths = async () => {

    const events = await fetchAllEvents();

    const paths = events.map(event => ({
        params: {
            slug: createEventSlug(event),
        },
    }));

    return {
        fallback: 'blocking',
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale }) => {
    const slug = processSlug(params?.slug);
    if (isEmptyString(slug) || locale === undefined) {
        return { notFound: true };
    }

    let event = await fetchEventByIdentifier(slug, locale);

    if (event === undefined) {
        event = await fetchEventBySlug(slug);
    }

    // Event does not exist.
    if (event === undefined) {
        return { notFound: true };
    }

    return {
        revalidate: 60,
        props: {
            initialEvent: event as Event,
            locale,
        },
    };
};

export default ({ initialEvent }: Props): ReactElement => {

    const { data: event } = useLivePreview<Event>({
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
        depth: 1,
        initialData: initialEvent,
    });

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <HeaderBar />

            <main id="content" className="relative">
                <ContentWrapper>
                    <EventDetails event={event} />
                </ContentWrapper>

                <ContentWrapper>
                    <EventButtons event={event} />
                </ContentWrapper>
            </main>

            <Footer />
        </div>
    );
};
