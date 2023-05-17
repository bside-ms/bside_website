import { useCallback, useMemo, useState } from 'react';
import { isBefore, isSameDay } from 'date-fns';
import Link from 'next/link';
import type { ReactElement } from 'react';
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
    events: Array<Event>;
    px?: boolean;
}

const NextEvents = ({ events: allEvents, px = false }: Props): ReactElement => {

    const [filteredEventType, setFilteredEventType] = useState<EventType | null>(null);

    const unsetFilteredEventType = useCallback(() => setFilteredEventType(null), []);

    const eventsGroupedByDay = useMemo(() => {

        return allEvents
            // .filter(event => filteredEventType === null || event.type === filteredEventType)
            .sort((eventA, eventB) => isBefore(new Date(eventA.eventDate), new Date(eventB.eventDate)) ? -1 : 1)
            .reduce<Array<[Date, Array<Event>]>>(
                (currentEventsGroupedByDay, event) => {
                    let foundDate = false;
                    currentEventsGroupedByDay.forEach(
                        ([date, events]) => {
                            if (isSameDay(date, new Date(event.eventDate))) {
                                foundDate = true;
                                events.push(event);
                            }
                        }
                    );

                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    if (!foundDate) {
                        currentEventsGroupedByDay.push([new Date(event.eventDate), [event]]);
                    }

                    return currentEventsGroupedByDay;
                },
                []
            );
    }, [allEvents]);

    return (
        <ContentWrapper px={px}>
            <div className="font-bold font-serif text-xl md:text-2xl text-center mb-3">
                Nächste Veranstaltungen
            </div>

            <div className="md:text-lg">
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

                <div>
                    {eventsGroupedByDay.map(([date, events]) => (
                        <div key={date.toString()} className="mb-2">
                            <div className="px-3 md:px-4 py-1 md:py-2 bg-black text-white font-serif font-bold">
                                {formatDate(date, 'EE dd. MMMM')}
                            </div>

                            {events.map(event => (
                                <div key={event.id} className="px-3 md:px-4 py-1 md:py-2 flex gap-3">
                                    <div className="w-14">{formatDate(new Date(event.eventStart), 'HH:mm')}</div>
                                    <div className="truncate flex-1">{event.title}</div>
                                    <Link href={`/events/${event.slug ?? event.id}`} className="truncate">... mehr</Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </ContentWrapper>
    );
};

export default NextEvents;
