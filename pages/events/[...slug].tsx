import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import hirestime from 'hirestime';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { useInView } from 'react-intersection-observer';
import Footer from '@/components/common/Footer';
import EventDetails from '@/components/events/EventDetails';
import Banner from '@/components/Layout/Banner';
import ContentDivider from '@/components/Layout/ContentDivider';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import HeaderBarContainer from '@/components/Layout/Header/HeaderBarContainer';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import logger from '@/lib/common/logger';
import createEventSlug from '@/lib/events/createEventSlug';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from 'types/payload/PaginatedDocs';
import type { Event } from 'types/payload/payload-types';

interface Props {
    event: Event;
}

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=100');

    const paths = pages.docs.map(event => ({
        params: {
            slug: [createEventSlug(event)],
        },
    }));

    return {
        fallback: 'blocking',
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {

    const getElapsed = hirestime();

    const rawSlug = params?.slug;

    if (rawSlug === undefined) {
        return { notFound: true };
    }

    const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug.join('/');

    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const idInSlugMatch = /-([a-z0-9]+)$/.exec(slug);

    const idInSlug = idInSlugMatch === null ? null : idInSlugMatch[1] ?? null;

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=100');

    const event = pagesResponse.docs.find(eventItem => (
        eventItem.slug === slug || eventItem.id === idInSlug
    ));

    if (event === undefined) {
        return { notFound: true };
    }

    logger.info({
        message: 'timing',
        path: `/events/[${slug}]`,
        time: getElapsed.seconds(),
    });

    return {
        revalidate: 60,
        props: {
            event,
        },
    };
};

export default ({ event }: Props): ReactElement => {

    const { ref: inViewFooterRef, inView: isFooterInView } = useInView({
        initialInView: true,
        threshold: 1,
    });

    return (
        <main className="min-h-screen flex flex-col justify-between">

            <HeaderBarContainer />

            <ContentDivider />

            {isNotEmptyString(event.id) && (
                <Banner
                    bannerId="ical-link"
                    bannerLink={`/api/ics/?eventId=${event.id}`}
                    bannerText="Veranstaltung in meinen Kalender eintragen!"
                    footerInView={isFooterInView}
                />
            )}

            <ContentWrapper>
                <EventDetails event={event} />

                <Link href="/events" className="mt-4 underline underline-offset-4 flex items-center gap-2 hover:text-orange-500">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} height={16} className="inline" /> Zurück zur Übersicht
                </Link>
            </ContentWrapper>

            <Footer>
                <div ref={inViewFooterRef} />
            </Footer>
        </main>
    );
};
