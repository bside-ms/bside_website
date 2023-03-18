import { useCallback, useMemo, useState } from 'react';
import { addDays, isBefore, isSameDay, setHours } from 'date-fns';
import type { ReactElement } from 'react';
import ContentWrapper from 'components/common/ContentWrapper';
import formatDate from 'lib/common/helper/formatDate';

const today = new Date();

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

interface Event {
    id: number;
    name: string;
    date: Date;
    type: 'concert' | 'movie' | 'theatre';
}

const fakeEvents: Array<Event> = [
    {
        id: 234,
        name: 'B-SIDE Kennenlerntreffen',
        date: addDays(today, 5),
        type: 'concert',
    },
    {
        id: 845,
        name: 'Faltenrock - Ü60 Rock&Pop Party',
        date: addDays(today, 1),
        type: 'theatre',
    },
    {
        id: 694,
        name: 'B-Side Funk Jahresrückblick 2022',
        date: setHours(addDays(today, 5), 20),
        type: 'movie',
    },
    {
        id: 741,
        name: 'Fluxkompensator - B-Side Festival Aftershowparty',
        date: addDays(today, 19),
        type: 'movie',
    },
];

const NextEvents = (): ReactElement => {

    const [filteredEventType, setFilteredEventType] = useState<EventType | null>(null);

    const unsetFilteredEventType = useCallback(() => setFilteredEventType(null), []);

    const eventsGroupedByDay = useMemo(() => {

        return fakeEvents
            .filter(event => filteredEventType === null || event.type === filteredEventType)
            .sort((eventA, eventB) => isBefore(eventA.date, eventB.date) ? -1 : 1)
            .reduce<Array<[Date, Array<Event>]>>(
                (currentEventsGroupedByDay, event) => {
                    let foundDate = false;
                    currentEventsGroupedByDay.forEach(
                        ([date, events]) => {
                            if (isSameDay(date, event.date)) {
                                foundDate = true;
                                events.push(event);
                            }
                        }
                    );

                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    if (!foundDate) {
                        currentEventsGroupedByDay.push([event.date, [event]]);
                    }

                    return currentEventsGroupedByDay;
                },
                []
            );
    }, [filteredEventType]);

    return (
        <ContentWrapper>
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
                                    <div className="w-14">{formatDate(event.date, 'HH:mm')}</div>
                                    <div className="truncate flex-1">{event.name}</div>
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
