import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { useInView } from 'react-intersection-observer';
import Footer from '@/components/common/Footer';
import EventDetails from '@/components/events/detail/EventDetails';
import Banner from '@/components/layout/Banner';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import createEventSlug from '@/lib/events/createEventSlug';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    event: Event;
    preview: boolean;
}

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=0');

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

export const getStaticProps: GetStaticProps<Props> = async ({ params, preview }) => {

    const rawSlug = params?.slug;

    if (rawSlug === undefined) {
        return { notFound: true };
    }

    const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug.join('/');

    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=0');

    const event = pagesResponse.docs.find(eventItem => (
        createEventSlug(eventItem as Event) === slug
    ));

    if (event === undefined) {
        return { notFound: true };
    }

    return {
        revalidate: 60,
        props: {
            event,
            preview: preview ?? false,
        },
    };
};

export default ({ event, preview }: Props): ReactElement => {

    const { ref: inViewFooterRef, inView: isFooterInView } = useInView({
        initialInView: true,
        threshold: 1,
    });

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <HeaderBar />
            <ContentDivider />

            <main id="content">
                {isNotEmptyString(event.id) && (
                    <Banner
                        bannerId="ical-link"
                        bannerLink={`/api/ics/?eventId=${event.id}`}
                        bannerText="Veranstaltung in meinen Kalender eintragen!"
                        footerInView={isFooterInView || preview}
                        isPreview={preview}
                    />
                )}

                <ContentWrapper>
                    <EventDetails event={event} />

                    <Link href="/events" className="mt-4 underline underline-offset-4 flex items-center gap-2 hover:text-orange-500">
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} height={16} className="inline" /> Zurück zur Übersicht
                    </Link>
                </ContentWrapper>
            </main>

            <Footer>
                <div ref={inViewFooterRef} />
            </Footer>
        </div>
    );
};
