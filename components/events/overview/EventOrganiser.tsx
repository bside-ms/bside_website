import { Fragment } from 'react';
import Link from 'next/link';
import type { ReactElement } from 'react';
import EventOwner from '@/components/events/overview/EventOwner';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import createEventSlug from '@/lib/events/createEventSlug';
import type { Event } from '@/types/payload/payload-types';

const EventOrganiser = ({ event }: {event: Event}): ReactElement => {
    const hasOwner = event.eventOwner?.length !== 0;
    const hasOrganiser = !isEmptyString(event.eventOrganizer);

    if (!hasOwner && !hasOrganiser) {
        return <div />;
    }

    if (!hasOwner && hasOrganiser) {
        return (
            <Link
                key={`event-${event.id}-organiser`}
                href={`/events/${createEventSlug(event)}`}
                className="truncate px-1 my-auto leading-6 text-sm italic border-black border-b text-black z-10 hover:border-b-orange-500"
                aria-label={`"Erfahre mehr über die Veranstalter:innen ${event.eventOrganizer}"`}
            >
                {event.eventOrganizer}
            </Link>
        );
    }

    return (
        <Fragment>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {event.eventOwner?.map((owner, index) => <EventOwner key={`event-${event.id}-owner-${index}`} owner={owner} />)}
        </Fragment>
    );
};

export default EventOrganiser;
