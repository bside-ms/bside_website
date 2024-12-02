import { addDays, isPast } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import EventImage from '@/components/events/detail/EventImage';
import formatDate from '@/lib/common/helper/formatDate';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import isEventImageMedia from '@/lib/events/isEventImageMedia';
import isEventImageString from '@/lib/events/isEventImageString';
import type { Event } from '@/types/payload/payload-types';
import RichText from 'components/blocks/richTextBlock/RichText';

interface Props {
    event: Event;
}

const EventDetails = ({ event }: Props): ReactElement => {
    const { locale } = useRouter();

    return (
        <div className="mb-2 md:mb-3">
            {isEventImageMedia(event.eventImage) || isEventImageString(event.eventImage) ? (
                <EventImage eventTitle={event.title} eventImage={event.eventImage} />
            ) : (
                <div className="h-6">{/* Image placeholder */}</div>
            )}

            {isPast(addDays(new Date(event.eventDate), 1)) && (
                <div className="mb-2 bg-orange-400 px-3 py-1 text-center font-serif sm:px-4 sm:text-lg">
                    <Link href="/events">
                        Die Veranstaltung liegt in der Vergangenheit!
                        <br />
                        Klicke hier, um zu unseren aktuellen Veranstaltungen zu gelangen!
                    </Link>
                </div>
            )}

            <div className="flex justify-between bg-black px-3 py-1 font-serif text-white sm:px-4 sm:py-2">
                <span className="sm:text-lg">
                    {formatDate(event.eventDate, 'EE dd. MMM yy', locale)}
                </span>

                <span className="sm:text-lg">
                    {formatDate(event.eventStart, 'HH:mm')}{' '}
                    {isNotEmptyString(event.eventEnd) && `- ${formatDate(event.eventEnd, 'HH:mm')}`}
                </span>
            </div>

            {isNotEmptyString(event.eventExtra) && (
                <>
                    <div className="gap-3 px-3 py-1 text-center font-serif sm:px-4 sm:text-lg md:py-2">
                        {event.eventExtra}
                    </div>

                    <hr className="mx-auto w-1/3 border border-black" />
                </>
            )}

            <div className="gap-3 px-3 py-1 text-center font-serif sm:px-4 sm:text-lg md:py-2">
                {event.eventLocation}
            </div>

            <div className="bg-black px-3 py-1 font-serif text-lg font-bold text-white sm:py-2 sm:text-2xl md:px-4">
                {event.title}
            </div>

            <RichText className="mt-2 sm:text-lg md:mt-4" content={event.richText} />

            {isNotEmptyString(event.eventOrganizer) && (
                <>
                    <div className="mt-2 font-bold sm:text-lg md:mt-4">
                        {locale === 'de' ? 'Veranstaltet von:' : 'Organized by:'}
                    </div>

                    <div className="sm:text-lg">{event.eventOrganizer}</div>
                </>
            )}
        </div>
    );
};

export default EventDetails;
