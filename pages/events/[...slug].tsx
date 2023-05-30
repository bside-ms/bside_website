import hirestime from 'hirestime';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import type { ReactElement } from 'react';
import Banner from '@/components/common/Banner';
import ContentWrapper from '@/components/common/ContentWrapper';
import Footer from '@/components/common/Footer';
import HeaderBar from '@/components/common/HeaderBar';
import EventImage from '@/components/events/EventImage';
import Navigation from '@/components/navigation/Navigation';
import formatDate from '@/lib/common/helper/formatDate';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import logger from '@/lib/common/logger';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import serializeRichTextToHtml from '@/lib/payload/serializeRichTextToHtml';
import type PaginatedDocs from 'types/payload/PaginatedDocs';
import type { Event, Media as MediaType } from 'types/payload/payload-types';

interface Props {
    event?: Event;
    eventImage: MediaType | string | null;
}

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=100&');

    const paths = pages.docs.map(({ slug, id }) => ({
        params: {
            slug: [slug === undefined ? id : slug],
        },
    }));

    return {
        fallback: true,
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {

    const getElapsed = hirestime();

    const rawSlug = context.params?.slug;

    if (rawSlug === undefined) {
        return { notFound: true };
    }

    const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug.join('/');

    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=100');

    const page = pagesResponse.docs.find(event => {
        return event.slug === `${slug}` || event.id === `${slug}`;
    });

    if (page === undefined) {
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
            event: page,
            eventImage: page.eventImage ?? null,
        },
    };
};

export default ({
    event,
    eventImage,
}: Props): ReactElement => {

    if (!event) {
        return (
            <main className="min-h-screen flex flex-col justify-between" />
        );
    }

    return (
        <main className="min-h-screen flex flex-col justify-between">

            <Navigation />

            {isEmptyString(event.eventEnd) ? '' : (
                <Banner
                    bannerId="ical-link"
                    bannerLink={`/api/ics/?eventId=${event.id}`}
                    bannerText="Veranstaltung in meinen Kalender eintragen!"
                    sticky={true}
                />
            )}

            <HeaderBar
                headerMenu={false}
                banner={!isEmptyString(event.eventEnd)}
            />

            <ContentWrapper>
                <div className="mb-2 md:mb-3">
                    {eventImage !== null && (
                        <EventImage
                            eventTitle={event.title}
                            eventImage={eventImage}
                        />
                    )}

                    <div className="px-3 sm:px-4 py-1 sm:py-2 bg-black text-white font-serif flex justify-between">
                        <span className="sm:text-lg">
                            {formatDate(event.eventDate, 'EE dd. MMM')}
                        </span>

                        <span className="sm:text-lg">
                            {formatDate(event.eventStart, 'HH:mm' + ' ')}

                            {isNotEmptyString(event.eventEnd) && `- ${formatDate(event.eventEnd, 'HH:mm')} `}
                        </span>
                    </div>

                    {isNotEmptyString(event.eventExtra) && (
                        <>
                            <div className="px-3 sm:px-4 py-1 md:py-2 gap-3 sm:text-lg text-center font-serif">
                                {event.eventExtra}
                            </div>

                            <hr className="w-1/3 mx-auto border-1 border-black" />
                        </>
                    )}

                    <div className="px-3 sm:px-4 py-1 md:py-2 gap-3 sm:text-lg text-center font-serif">
                        {event.eventLocation}
                    </div>

                    <div className="px-3 md:px-4 py-1 sm:py-2 bg-black text-white font-serif">
                        <span className="text-lg sm:text-2xl font-bold">
                            {event.title}
                        </span>
                    </div>

                    <div className="mt-2 sm:text-lg md:mt-4">
                        {serializeRichTextToHtml(event.richText)}
                    </div>

                    {isNotEmptyString(event.eventOrganizer) && (
                        <>
                            <div className="mt-2 sm:text-lg md:mt-4 font-bold">
                                Veranstaltet von:
                            </div>

                            <div className="sm:text-lg">
                                {event.eventOrganizer}
                            </div>
                        </>
                    )}
                </div>

                <div className="sm:text-lg mt-4 text-blue-800 underline">
                    <Link href="/events">
                        &lt;- Zurück zur Übersicht
                    </Link>
                </div>
            </ContentWrapper>

            <Footer />
        </main>
    );
};
