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

    return (
        <div className="mb-2 md:mb-3">
            {(isEventImageMedia(event.eventImage) || isEventImageString(event.eventImage)) && (
                <EventImage
                    eventTitle={event.title}
                    eventImage={event.eventImage}
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

            <RichText className="mt-2 sm:text-lg md:mt-4" content={event.richText} />

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
    );
};

export default EventDetails;
