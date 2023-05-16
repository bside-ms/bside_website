import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import { Media } from '../../components/Media';
import formatDate from '../../lib/common/helper/formatDate';
import ContentWrapper from 'components/common/ContentWrapper';
import Footer from 'components/common/Footer';
import HeaderBar from 'components/common/HeaderBar';
import Navigation from 'components/navigation/Navigation';
import isEmptyString from 'lib/common/helper/isEmptyString';
import getPayloadResponse from 'lib/payload/getPayloadResponse';
import serializeRichTextToHtml from 'lib/payload/serializeRichTextToHtml';
import type PaginatedDocs from 'types/payload/PaginatedDocs';
import type { Event, Media as MediaType } from 'types/payload/payload-types';

interface Props {
    event: Event;
    eventImage: MediaType;
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const slug = context.params?.slug ? (context.params.slug as Array<string>).join('/') : '';

    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=100');

    const page = pagesResponse.docs.find(event => {
        return event.slug === `${slug}`;
    });

    if (page === undefined) {
        return { notFound: true };
    }

    return { props: {
        event: page,
        eventImage: page.eventImage as MediaType,
    } };
};

export default ({ event, eventImage }: Props): ReactElement => {
    return (
        <main className="min-h-screen flex flex-col justify-between">
            <Navigation />

            <HeaderBar />

            <ContentWrapper>
                <div className="px-8 mb-2 md:mb-3">

                    <Media
                        src={eventImage.sizes?.event?.url}
                        width={(342)}
                        height={(342)}
                        alt={eventImage.alt}
                        imgClassName="mx-auto pb-2"
                        sizes="thumbnail"
                    />

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

                    <div className="px-3 md:px-4 py-1 md:py-2 bg-black text-white font-serif flex justify-between">
                        <span className="text-sm lg:text-lg">
                            {event.title}
                        </span>
                    </div>

                    <div className="font-bold font-serif text-2xl md:text-4xl" />

                    <div className="mt-1 text-sm md:text-lg md:mt-3">
                        {serializeRichTextToHtml(event.richText)}
                    </div>
                </div>
            </ContentWrapper>

            <Footer />
        </main>
    );
};
