import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLivePreview } from '@payloadcms/live-preview-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import EventDetails from '@/components/events/detail/EventDetails';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { fetchEventByIdentifier } from '@/lib/events';
import createEventSlug, { createEventSlugOld } from '@/lib/events/createEventSlug';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    initialEvent: Event;
}

const processSlug = (rawSlug: string | Array<string> | undefined): string => {
    if (rawSlug === undefined) {
        return '';
    }

    return typeof rawSlug === 'string' ? rawSlug : rawSlug.join('/');
};

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=9999');

    const paths = pages.docs.map(event => ({
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

    let event: Event | undefined = await fetchEventByIdentifier(slug, locale);

    // Check if it is an old style link.
    if (event === undefined) {
        const pagesResponse = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=9999');
        event = pagesResponse.docs.find(eventItem => (
            createEventSlug(eventItem as Event) === slug || createEventSlugOld(eventItem as Event) === slug
        ));
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

    const { locale } = useRouter();

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <HeaderBar />

            <main id="content" className="relative">
                <ContentWrapper>
                    <EventDetails event={event} />

                    <Link href="/events" className="mt-4 underline underline-offset-4 flex items-center gap-2 hover:text-orange-500">
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} height={16} className="inline" /> {locale === 'de' ? 'Zurück zur Übersicht' : 'Back to overview'}
                    </Link>
                </ContentWrapper>

                <div className="sticky bottom-0 text-white font-serif text-base md:text-xl lg:text-2xl">
                    <Link
                        className="block p-2 text-center bg-black hover:bg-orange-600"
                        href={`/api/ics/?eventId=${event.id}`}
                    >
                        {locale === 'de' ? 'Veranstaltung in meinen Kalender eintragen!' : 'Add event to my calendar!'}
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};
