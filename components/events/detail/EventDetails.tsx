import { differenceInCalendarDays } from 'date-fns';
import Link from 'next/link';
import { ReactElement } from 'react';
import EventImage from '@/components/events/detail/EventImage';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import isEventImageMedia from '@/lib/events/isEventImageMedia';
import isEventImageString from '@/lib/events/isEventImageString';
import type { Event } from '@/types/payload/payload-types';
import RichText from 'components/blocks/richTextBlock/RichText';
import useLocale from '@/lib/common/hooks/useLocale';
import useGetEventCategoryTitle from '@/lib/events/useGetEventCategoryTitle';
import { isNil } from 'lodash-es';
import useFormatDate from '@/lib/common/hooks/useFormatDate';

interface Props {
    event: Event;
}

const EventDetails = ({
    event: {
        eventDate,
        eventEnd,
        eventExtra,
        eventImage,
        eventLocation,
        eventOrganizer,
        eventStart,
        category: categories,
        eventOwner: eventOwners,
        richText,
        title,
    },
}: Props): ReactElement => {
    const locale = useLocale();
    const getEventCategoryTitle = useGetEventCategoryTitle();
    const formatDate = useFormatDate();

    return (
        <div className="mb-2 md:mb-3">
            {isEventImageMedia(eventImage) || isEventImageString(eventImage) ? (
                <EventImage eventTitle={title} eventImage={eventImage} />
            ) : (
                <div className="h-6">{/* Image placeholder */}</div>
            )}

            {differenceInCalendarDays(eventDate, new Date()) < 0 && (
                <div className="mb-2 bg-orange-400 px-3 py-1 text-center font-serif sm:px-4 sm:text-lg">
                    <Link href="/events">
                        {locale === 'de' ? (
                            <>
                                Die Veranstaltung liegt in der Vergangenheit!
                                <br />
                                Klicke hier, um zu unseren aktuellen Veranstaltungen zu gelangen!
                            </>
                        ) : (
                            <>
                                The event has already taken place!
                                <br />
                                Click here to view our current events!
                            </>
                        )}
                    </Link>
                </div>
            )}

            <div className="flex justify-between bg-black px-3 py-1 font-serif text-white sm:px-4 sm:py-2">
                <span className="sm:text-lg">{formatDate(eventDate, 'EE dd. MMM yy')}</span>

                <span className="sm:text-lg">
                    {formatDate(eventStart, 'HH:mm')}{' '}
                    {isNotEmptyString(eventEnd) && `- ${formatDate(eventEnd, 'HH:mm')}`}
                </span>
            </div>

            {categories !== null && categories !== undefined && categories.length > 0 && (
                <>
                    <div className="gap-2 px-3 py-1 text-center font-serif sm:px-4 sm:text-lg md:py-2">
                        {categories.map((category) => getEventCategoryTitle(category)).join(' – ')}
                    </div>
                    <hr className="mx-auto w-1/3 border border-black" />
                </>
            )}

            {isNotEmptyString(eventExtra) && (
                <>
                    <div className="gap-3 px-3 py-1 text-center font-serif sm:px-4 sm:text-lg md:py-2">
                        {eventExtra}
                    </div>

                    <hr className="mx-auto w-1/3 border border-black" />
                </>
            )}

            <div className="gap-3 px-3 py-1 text-center font-serif sm:px-4 sm:text-lg md:py-2">
                {eventLocation}
            </div>

            <div className="bg-black px-3 py-1 font-serif text-lg font-bold text-white sm:py-2 sm:text-2xl md:px-4">
                {title}
            </div>

            <RichText className="mt-2 sm:text-lg md:mt-4" content={richText} />

            {isNotEmptyString(eventOrganizer) ? (
                <>
                    <div className="mt-2 font-bold sm:text-lg md:mt-4">
                        {locale === 'de' ? 'Veranstaltet von:' : 'Organized by:'}
                    </div>

                    <div className="sm:text-lg">{eventOrganizer}</div>
                </>
            ) : (
                !isNil(eventOwners) &&
                eventOwners.length > 0 && (
                    <>
                        <hr className="mx-auto mt-3 w-1/3 border border-black" />

                        <div className="gap-2 px-3 py-1 text-center font-serif sm:px-4 sm:text-lg md:py-2">
                            {eventOwners
                                .map(({ value }) =>
                                    typeof value === 'string' ? value : value.name,
                                )
                                .join(' – ')}
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default EventDetails;
