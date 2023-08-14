import { Fragment, useCallback, useMemo, useState } from 'react';
import { uniq } from 'lodash';
import type { ReactElement } from 'react';
import EventOverviewEmpty from '@/components/events/overview/EventOverviewEmpty';
import EventOverviewEntry from '@/components/events/overview/EventOverviewEntry';
import formatDate from '@/lib/common/helper/formatDate';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { groupEventsByDay } from '@/lib/events';
import type EventCategory from '@/lib/events/EventCategory';
import getEventCategoryTitle from '@/lib/events/getEventCategoryTitle';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    title?: string;
    events: Array<Event>;
    pastEvents?: boolean;
    noFilters?: boolean;
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

const EventOverview = ({
    title = 'Nächste Veranstaltungen',
    events: allEvents,
    pastEvents = false,
    noFilters = false,
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
                        {!noFilters && (
                            <Fragment>
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
                            </Fragment>
                        )}
                    </div>
                )}

                <div>
                    {groupByDay.map(([date, events]) => (
                        <div key={date.toString()} className="mb-2">
                            <div className="px-3 md:px-4 py-1 md:py-2 bg-black text-white font-serif font-bold">
                                {formatDate(date, 'EE dd. MMMM')}
                            </div>

                            {events.map((event, index) => (
                                <EventOverviewEntry key={`event-${event.id}`} event={event} index={index} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventOverview;
