import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { groupEventsByDay } from '@/lib/events';
import ContentWrapper from 'components/common/ContentWrapper';
import formatDate from 'lib/common/helper/formatDate';
import type { Event } from 'types/payload/payload-types';

type EventType = 'concert' | 'movie' | 'theatre';

const eventTitles: Record<EventType, string> = {
    concert: 'Konzert',
    movie: 'Film',
    theatre: 'Theater',
};

const EventTypeFilter = ({ type, onClick, isActive }: { type: EventType, onClick: (type: EventType) => void, isActive: boolean }): ReactElement => {

    const handleClick = useCallback(() => onClick(type), [onClick, type]);

    return (
        <div
            onClick={handleClick}
            className="border-r border-gray-800 px-3 leading-4 last:border-0 last:pr-0 md:cursor-pointer md:hover:text-orange-500"
        >
            <div className={isActive ? 'text-gray-500 cursor-default' : ''}>
                {eventTitles[type]}
            </div>
        </div>
    );
};

interface Props {
    title?: string;
    events: Array<Event>;
    px?: boolean;
    pastEvents?: boolean;
    disableFilter?: boolean;
}

const NextEvents = ({ title = 'Nächste Veranstaltungen', events: allEvents, px = false, pastEvents = false, disableFilter = false }: Props): ReactElement => {

    const [filteredEventType, setFilteredEventType] = useState<EventType | null>(null);

    const unsetFilteredEventType = useCallback(() => setFilteredEventType(null), []);

    const groupByDay = useMemo(() => {
        const events = groupEventsByDay(allEvents);
        if (pastEvents) {
            events.reverse();
        }
        return events;
    }, [allEvents]);

    return (
        <ContentWrapper px={px}>
            {!isEmptyString(title) ? (
                <div className="font-bold font-serif text-xl md:text-2xl text-center mb-3">
                    {title}
                </div>
            ) : (<div />)}

            <div className="md:text-lg">
                {disableFilter ? (<div />) : (
                    <div className="mb-3 flex flex-wrap">
                        <div
                            onClick={unsetFilteredEventType}
                            className="border-r border-gray-800 pr-3 leading-4 md:cursor-pointer md:hover:text-orange-500"
                        >
                            <div className={filteredEventType === null ? 'text-gray-500 cursor-default' : ''}>
                                Alle
                            </div>
                        </div>

                        {(Object.keys(eventTitles) as Array<EventType>).map(eventType => (
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
                                <Link href={`/events/${event.slug ?? event.id}`} key={event.id} className="px-3 md:px-4 py-1 md:py-2 flex gap-3">
                                    <div className="w-14">{formatDate(new Date(event.eventStart), 'HH:mm')}</div>
                                    <div className="truncate flex-1">{event.title}</div>
                                    <div className="truncate">... mehr</div>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </ContentWrapper>
    );
};

export default NextEvents;
