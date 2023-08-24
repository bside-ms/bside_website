import { Fragment } from 'react';
import Link from 'next/link';
import type { ReactElement } from 'react';
import EventOrganiser from '@/components/events/overview/EventOrganiser';
import formatDate from '@/lib/common/helper/formatDate';
import createEventSlug from '@/lib/events/createEventSlug';
import getEventCategoryTitle from '@/lib/events/getEventCategoryTitle';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    event: Event;
    index: number;
}

const EventOverviewEntry = ({ event, index }: Props): ReactElement => {
    return (
        <Fragment key={event.id}>

            {index !== 0 && (
                <div>
                    <hr className="w-full mx-auto border-1 border-black mt-2" />
                </div>
            )}

            <Link
                key={`event-${event.id}-link`}
                href={`/events/${createEventSlug(event)}`}
                className="px-3 md:px-4 pt-1 md:pt-2 flex gap-3 hover:text-orange-500"
                aria-label={`Erfahre mehr über die Veranstaltung "${event.title}".`}
            >
                <div className="w-14">{formatDate(new Date(event.eventStart), 'HH:mm')}</div>
                <div key={`event-${event.id}-title`} className="truncate flex-1 font-bold">{event.title}</div>
                <div className="truncate">... mehr</div>
            </Link>

            <div className="px-3 md:px-4 pb-1 md:pb-2 flex gap-3 relative">
                <Link
                    href={`/events/${createEventSlug(event)}`}
                    className="absolute top-0 bottom-0 right-0 left-0 hover:text-orange-500"
                    aria-label={`Erfahre mehr über die Veranstaltung "${event.title}".`}
                />
                <div className="w-0 sm:w-14" />
                {event.category?.map(cat => (
                    <div key={`event-title-${event.id}-${cat}`} className="truncate px-1 my-auto leading-6 text-sm italic">
                        {getEventCategoryTitle(cat)}
                    </div>
                ))}

                <EventOrganiser event={event} />
            </div>

        </Fragment>
    );
};

export default EventOverviewEntry;
