import { Fragment, useCallback, useMemo, useState } from 'react';
import { uniq } from 'lodash';
import Link from 'next/link';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { groupEventsByDay } from '@/lib/events';
import createCircleLink from '@/lib/events/createCircleLink';
import createEventSlug from '@/lib/events/createEventSlug';
import createOrganisationLink from '@/lib/events/createOrganisationLink';
import type EventCategory from '@/lib/events/EventCategory';
import getEventCategoryTitle from '@/lib/events/getEventCategoryTitle';
import formatDate from 'lib/common/helper/formatDate';
import type { Circle, Event, Organisation } from 'types/payload/payload-types';

interface NoEventProps {
    title?: string;
}

interface Props {
    title?: string;
    events: Array<Event>;
    pastEvents?: boolean;
}

const EventTypeFilter = ({ type, onClick, isActive }: { type: EventCategory, onClick: (type: EventCategory) => void, isActive: boolean }): ReactElement => {

    const handleClick = useCallback(() => onClick(type), [onClick, type]);

    return (
        <div
            onClick={handleClick}
            className="border-r border-gray-800 px-3 leading-4 last:border-0 last:pr-0 md:cursor-pointer md:hover:text-orange-500 select-none"
        >
            <div className={isActive ? 'text-gray-500' : ''}>
                {getEventCategoryTitle(type)}
            </div>
        </div>
    );
};

const NoNextEvents = ({ title = 'Nächste Veranstaltungen' }: NoEventProps): ReactElement => {
    return (
        <div>
            {!isEmptyString(title) && (
                <div className="font-bold font-serif text-xl md:text-2xl text-center mb-3">
                    {title}
                </div>
            )}

            <div className="md:text-lg">
                <div>
                    <div className="mb-2">
                        <div className="px-3 md:px-4 py-1 md:py-2 bg-black text-white font-serif font-bold">
                            Nichts gefunden!
                        </div>

                        <div className="px-3 md:px-4 py-1 md:py-2 flex gap-3">
                            <div className="w-full">Hier gibt es aktuell keine Termine.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EventOwner = ({ owner }: { owner: { value: string, relationTo: 'organisations' } | { value: string, relationTo: 'circles' } | { value: Organisation, relationTo: 'organisations' } | { value: Circle, relationTo: 'circles' } }): ReactElement => {
    if (owner.relationTo === 'organisations') {
        const organisation = owner.value as Organisation;
        return (
            <Link
                href={createOrganisationLink(organisation)}
                className="truncate px-1 my-auto leading-6 font-serif text-sm border border-black text-black hover:text-orange-500 z-10"
                aria-label={`"Erfahre mehr über ${organisation.name}"`}
            >
                {organisation.name}
            </Link>
        );
    }

    // It's a circle!
    const circle = owner.value as Circle;
    return (
        <Link
            href={createCircleLink(circle)}
            className="truncate px-1 my-auto leading-6 font-serif text-sm border border-black text-black hover:text-orange-500 z-10"
            aria-label={`"Erfahre mehr über ${circle.name}"`}
        >
            {circle.name}
        </Link>
    );
};

const EventOrganiser = ({ event }: {event: Event}): ReactElement => {
    const hasOwner = event.eventOwner?.length !== 0;
    const hasOrganiser = !isEmptyString(event.eventOrganizer);

    if (!hasOwner && !hasOrganiser) {
        return <div />;
    }

    if (!hasOwner && hasOrganiser) {
        return (
            <Link
                href={`/events/${createEventSlug(event)}`}
                className="truncate px-1 my-auto leading-6 font-serif text-sm border border-black text-black z-10"
                aria-label={`"Erfahre mehr über die Veranstalter:innen ${event.eventOrganizer}"`}
            >
                {event.eventOrganizer}
            </Link>
        );
    }

    return (
        <Fragment>
            {event.eventOwner?.map(owner => <EventOwner key={event.id} owner={owner} />)}
        </Fragment>
    );
};

const EventOverview = ({
    title = 'Nächste Veranstaltungen',
    events: allEvents,
    pastEvents = false,
}: Props): ReactElement => {

    const allAvailableCategories = useMemo((): Array<EventCategory> => (
        uniq(
            allEvents.reduce(
                (availableCategories, eventItem) => {
                    // It can be null on the server, maybe we need to check the payload types.
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    if (eventItem.category !== undefined && eventItem.category !== null) {
                        availableCategories.push(...eventItem.category);
                    }

                    return availableCategories;
                },
                new Array<EventCategory>()
            )
        )
    ), [allEvents]);

    const [filteredEventType, setFilteredEventType] = useState<EventCategory | null>(null);

    const filteredEvents = allEvents.filter(eventItem => (
        filteredEventType === null || (eventItem.category ?? []).includes(filteredEventType)
    ));

    const unsetFilteredEventType = useCallback(() => setFilteredEventType(null), []);

    const groupByDay = useMemo(() => {
        const events = groupEventsByDay(filteredEvents);
        if (pastEvents) {
            events.reverse();
        }
        return events;
    }, [filteredEvents, pastEvents]);

    if (filteredEvents.length === 0) {
        return NoNextEvents({ title });
    }

    return (
        <div>
            {!isEmptyString(title) && (
                <div className="font-bold font-serif text-xl md:text-2xl text-center mb-3">
                    {title}
                </div>
            )}

            <div className="md:text-lg">
                {allAvailableCategories.length > 1 && (
                    <div className="px-4 sm:px-0 mb-3 flex flex-wrap">
                        <div
                            onClick={unsetFilteredEventType}
                            className="border-r border-gray-800 px-3 leading-4 last:border-0 last:pr-0 md:cursor-pointer md:hover:text-orange-500 select-none"
                        >
                            <div className={filteredEventType === null ? 'text-gray-500' : ''}>
                                Alle
                            </div>
                        </div>

                        {allAvailableCategories.map(eventType => (
                            <EventTypeFilter
                                key={eventType}
                                type={eventType}
                                onClick={setFilteredEventType}
                                isActive={filteredEventType === eventType}
                            />
                        ))}
                    </div>
                )}

                <div>
                    {groupByDay.map(([date, events]) => (
                        <div key={date.toString()} className="mb-2">
                            <div className="px-3 md:px-4 py-1 md:py-2 bg-black text-white font-serif font-bold">
                                {formatDate(date, 'EE dd. MMMM')}
                            </div>

                            {events.map(event => (
                                <Fragment key={event.id}>
                                    <div className="px-3 md:px-4 pt-1 md:pt-2 flex gap-3 relative">
                                        <Link href={`/events/${createEventSlug(event)}`} className="absolute top-0 bottom-0 right-0 left-0" />
                                        <div className="w-0 sm:w-14" />
                                        {event.category?.map(cat => (
                                            <div key={cat} className="truncate px-1 my-auto leading-6 font-serif text-sm bg-black text-white">
                                                {getEventCategoryTitle(cat)}
                                            </div>
                                        ))}

                                        <EventOrganiser event={event} />
                                    </div>

                                    <Link href={`/events/${createEventSlug(event)}`} className="px-3 md:px-4 pb-1 md:pb-2 flex gap-3">
                                        <div className="w-14">{formatDate(new Date(event.eventStart), 'HH:mm')}</div>
                                        <div className="truncate flex-1">{event.title}</div>
                                        <div className="truncate">... mehr</div>
                                    </Link>

                                </Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventOverview;
