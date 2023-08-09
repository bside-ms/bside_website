import { Fragment, useCallback, useMemo, useState } from 'react';
import { uniq } from 'lodash';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { EventOrganiser, EventOverviewEmpty, EventTypeFilter } from '@/components/Events/Overview';
import formatDate from '@/lib/common/helper/formatDate';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { groupEventsByDay } from '@/lib/events';
import createEventSlug from '@/lib/events/createEventSlug';
import type EventCategory from '@/lib/events/EventCategory';
import getEventCategoryTitle from '@/lib/events/getEventCategoryTitle';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    title?: string;
    events: Array<Event>;
    pastEvents?: boolean;
}

const EventOverview = ({
    title = 'Nächste Veranstaltungen',
    events: allEvents,
    pastEvents = false,
}: Props): ReactElement => {

    const allAvailableCategories = useMemo((): Array<EventCategory> => (
        uniq(
            allEvents.reduce(
                (availableCategories, eventItem) => {

                    // ToDo: It can be null on the server, there is an error in the payload types..
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
        return EventOverviewEmpty({ title });
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

                            {events.map((event, index) => (
                                <Fragment key={event.id}>

                                    {index !== 0 && (
                                        <div>
                                            <hr className="w-full mx-auto border-1 border-black mt-2" />
                                        </div>
                                    )}

                                    <Link href={`/events/${createEventSlug(event)}`} className="px-3 md:px-4 pt-1 md:pt-2 flex gap-3">
                                        <div className="w-14">{formatDate(new Date(event.eventStart), 'HH:mm')}</div>
                                        <div className="truncate flex-1 font-bold">{event.title}</div>
                                        <div className="truncate">... mehr</div>
                                    </Link>

                                    <div className="px-3 md:px-4 pb-1 md:pb-2 flex gap-3 relative">
                                        <Link href={`/events/${createEventSlug(event)}`} className="absolute top-0 bottom-0 right-0 left-0" />
                                        <div className="w-0 sm:w-14" />
                                        {event.category?.map(cat => (
                                            <div key={`event-title-${event.id}`} className="truncate px-1 my-auto leading-6 text-sm italic">
                                                {getEventCategoryTitle(cat)}
                                            </div>
                                        ))}

                                        <EventOrganiser event={event} />
                                    </div>

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
