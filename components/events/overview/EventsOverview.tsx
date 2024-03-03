import { useCallback, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import EventOverviewEmpty from '@/components/events/overview/EventOverviewEmpty';
import EventOverviewEntry from '@/components/events/overview/EventOverviewEntry';
import EventsPagination from '@/components/events/overview/EventsPagination';
import delayExecution from '@/lib/common/helper/delayExecution';
import formatDate from '@/lib/common/helper/formatDate';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type EventCategory from '@/lib/events/EventCategory';
import getEventCategoryTitle from '@/lib/events/getEventCategoryTitle';
import groupEventsByDay from '@/lib/events/groupEventsByDay';
import useAllEvents from '@/lib/events/useAllEvents';
import useAvailableCategoryFilters from '@/lib/events/useAvailableCategoryFilters';
import type EventsOnPage from '@/types/EventsOnPage';

interface Props {
    title?: string;
    eventsOnPage?: EventsOnPage;
}

const EventCategoryFilter = ({
    category,
    onClick,
    isActive,
}: {
    category: EventCategory;
    onClick: (type: EventCategory) => void;
    isActive: boolean;
}): ReactElement => {

    const handleClick = useCallback(() => onClick(category), [onClick, category]);
    const { locale } = useRouter();

    return (
        <div
            onClick={handleClick}
            className="border-r border-gray-800 px-3 leading-4 last:border-0 last:pr-0 md:cursor-pointer md:hover:text-orange-500 select-none"
        >
            <div className={isActive ? 'text-gray-500' : ''}>
                {getEventCategoryTitle(category, locale)}
            </div>
        </div>
    );
};

const EventsOverview = ({ title = '', eventsOnPage }: Props): ReactElement => {

    const [page, setPage] = useState(1);

    const [categories, setCategories] = useState<Array<EventCategory>>([]);

    const paginatedEvents = useAllEvents(eventsOnPage, page, categories);

    const allAvailableCategories = useAvailableCategoryFilters(eventsOnPage);

    const handleToggleCategory = useCallback((category: EventCategory) => {
        setCategories(prevState => {
            if (prevState.includes(category)) {
                return prevState.filter(categoryItem => categoryItem !== category);
            } else {
                return [...prevState, category];
            }
        });
    }, []);

    const { locale } = useRouter();

    const unsetFilteredEventType = useCallback(() => setCategories([]), []);

    const groupByDay = useMemo(
        () => groupEventsByDay(paginatedEvents?.docs ?? [], eventsOnPage?.dateDirection === 'past'),
        [eventsOnPage?.dateDirection, paginatedEvents?.docs]
    );

    const eventsScrollAnchorRef = useRef<HTMLDivElement>(null);

    const handleSetPage = useCallback(async (newPage: number) => {
        setPage(newPage);

        await delayExecution(100);

        eventsScrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    if (paginatedEvents?.docs.length === 0) {
        return EventOverviewEmpty({ title });
    }

    return (
        <div className="relative">
            <div ref={eventsScrollAnchorRef} className="absolute -top-52 md:-top-24" />

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
                            <div className={categories.length === 0 ? 'text-gray-500' : ''}>
                                {locale === 'de' ? 'Alle' : 'All'}
                            </div>
                        </div>

                        {allAvailableCategories.map(eventCategory => (
                            <EventCategoryFilter
                                key={eventCategory}
                                category={eventCategory}
                                onClick={handleToggleCategory}
                                isActive={categories.includes(eventCategory)}
                            />
                        ))}
                    </div>
                )}

                <div>
                    {groupByDay.map(([date, events]) => (
                        <div key={date.toString()} className="mb-2">
                            <div className="px-3 md:px-4 py-1 md:py-2 bg-black text-white font-serif font-bold">
                                {formatDate(date, 'EE dd. MMMM yy', locale)}
                            </div>

                            {events.map((event, index) => (
                                <EventOverviewEntry key={`event-${event.id}`} event={event} index={index} />
                            ))}
                        </div>
                    ))}
                </div>

                {paginatedEvents !== undefined && (
                    <EventsPagination paginatedEvents={paginatedEvents} page={page} setPage={handleSetPage} />
                )}
            </div>
        </div>
    );
};

export default EventsOverview;
