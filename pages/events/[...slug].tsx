// eslint-disable-next-line simple-import-sort/imports
import hirestime from 'hirestime';

import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import { Media } from '../../components/Media';
import formatDate from '../../lib/common/helper/formatDate';
import logger from '../../lib/logger';
import ContentWrapper from 'components/common/ContentWrapper';
import Footer from 'components/common/Footer';
import HeaderBar from 'components/common/HeaderBar';
import Navigation from 'components/navigation/Navigation';
import isEmptyString from 'lib/common/helper/isEmptyString';
import getPayloadResponse from 'lib/payload/getPayloadResponse';
import serializeRichTextToHtml from 'lib/payload/serializeRichTextToHtml';
import type PaginatedDocs from 'types/payload/PaginatedDocs';
import type { Event, Media as MediaType } from 'types/payload/payload-types';
import { useInView } from 'react-intersection-observer';

interface Props {
    event?: Event;
    eventImage?: MediaType;
}

const fetchAllEvents = async () => {
    const pages = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=100');

    return pages.docs.map(({ slug, id }) => ({
        params: {
            slug: [slug === undefined ? id : slug],
        },
    }));
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await fetchAllEvents();

    return {
        fallback: true,
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const getElapsed = hirestime();

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const slug = context.params?.slug ? (context.params.slug as Array<string>).join('/') : '';

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
            eventImage: page.eventImage as MediaType ?? null,
        },
    };
};

export default ({ event, eventImage }: Props): ReactElement => {
    if (!event) {
        return (
            <main className="min-h-screen flex flex-col justify-between" />
        );
    }

    const { ref: startPostRef, inView: startPos } = useInView({ initialInView: true });

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <div ref={startPostRef} />

            <Navigation />

            <HeaderBar />

            {!event.eventEnd ? '' : (
                <div
                    className="fixed bottom-3 lg:bottom-10 left-3 right-3 lg:left-36 lg:right-36 z-10 bg-black py-2 text-center transition-opacity duration-100"
                    style={startPos ? { opacity: 1 } : { opacity: 0 }}
                >

                    <a
                        href={`/api/ics/?eventId=${event.id}`}
                        className="text-white font-serif text-sm lg:text-lg hover:bg-orange-600"
                    >
                        Veranstaltung in meinen Kalender eintragen!
                    </a>
                </div>
            )}

            <ContentWrapper>
                <div className="px-8 mb-2 md:mb-3">

                    {eventImage ? (
                        <Media
                            src={eventImage.sizes?.event?.url}
                            width={(342)}
                            height={(342)}
                            alt={eventImage.alt}
                            imgClassName="mx-auto mb-4"
                            sizes="thumbnail"
                        />
                    ) : ''}

                    <div className="px-3 md:px-4 py-1 md:py-2 bg-black text-white font-serif flex justify-between">
                        <span className="text-sm lg:text-lg">
                            {formatDate(event.eventDate, 'EE dd. MMM')}
                        </span>
                        <span className="text-sm lg:text-lg">
                            {formatDate(event.eventStart, 'HH:mm' + ' ')}
                            { event.eventEnd ? `- ${formatDate(event.eventEnd, 'HH:mm')} ` : '' }
                        </span>
                    </div>
                    {
                        event.eventExtra ? (
                            <>
                                <div key={event.id} className="px-3 md:px-4 py-1 md:py-2 gap-3 text-sm lg:text-lg text-center">
                                    <span className="text-sm lg:text-lg font-serif center">
                                        {event.eventExtra}
                                    </span>
                                </div>

                                <hr className="w-1/3 mx-auto border-1 border-black" />
                            </>
                        ) : ''
                    }

                    <div key={event.id} className="px-3 md:px-4 py-1 md:py-2 gap-3 text-sm lg:text-lg text-center">
                        <span className="text-sm lg:text-lg font-serif center">
                            {event.eventLocation}
                        </span>
                    </div>

                    <div className="px-3 md:px-4 py-1 md:py-2 bg-black text-white font-serif">
                        <span className="text-lg lg:text-2xl font-bold">
                            {event.title}
                        </span>
                    </div>

                    <div className="font-bold font-serif text-2xl md:text-4xl" />

                    <div className="mt-2 text-sm md:text-lg md:mt-4">
                        {serializeRichTextToHtml(event.richText)}
                    </div>

                    {!event.eventOrganizer ? '' : (
                        <>
                            <div className="mt-2 text-sm md:text-lg md:mt-4 font-bold">
                                Veranstaltet von:
                            </div>

                            <div className="text-sm md:text-lg">
                                {event.eventOrganizer}
                            </div>
                        </>
                    )}

                </div>
            </ContentWrapper>

            <Footer />
        </main>
    );
};
