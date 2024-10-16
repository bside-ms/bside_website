import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
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
            className="select-none border-r border-gray-800 px-3 leading-4 last:border-0 last:pr-0 md:cursor-pointer md:hover:text-orange-500"
        >
            <div
                className={
                    isActive
                        ? 'text-orange-500 underline underline-offset-2 hover:text-gray-500'
                        : ''
                }
            >
                {getEventCategoryTitle(category, locale)}
            </div>
        </div>
    );
};

const pageParam = 'page';

const EventsOverview = ({ title = '', eventsOnPage }: Props): ReactElement => {
    const searchParams = new URLSearchParams(
        typeof window === 'undefined' ? undefined : window.location.search,
    );

    const [page, setPage] = useState(Number(searchParams.get(pageParam) ?? 1));

    useEffect(() => {
        const url = new URL(window.location.href);

        if (page === 1) {
            url.searchParams.delete(pageParam);
        } else {
            url.searchParams.set(pageParam, page.toString());
        }

        window.history.replaceState(window.history.state, '', url.href);
    }, [page]);

    const [categories, setCategories] = useState<Array<EventCategory>>([]);

    const paginatedEvents = useAllEvents(eventsOnPage, page, categories);

    useEffect(() => {
        if (paginatedEvents === undefined) {
            return;
        }

        if (paginatedEvents.totalPages < page) {
            setPage(paginatedEvents.totalPages);
        } else if (paginatedEvents.page !== undefined && paginatedEvents.page !== page) {
            setPage(paginatedEvents.page);
        }
    }, [paginatedEvents]);

    const allAvailableCategories = useAvailableCategoryFilters(eventsOnPage);

    const handleToggleCategory = useCallback((category: EventCategory) => {
        setCategories((prevState) => {
            if (prevState.includes(category)) {
                return prevState.filter((categoryItem) => categoryItem !== category);
            } else {
                return [...prevState, category];
            }
        });
    }, []);

    const { locale } = useRouter();

    const unsetFilteredEventType = useCallback(() => setCategories([]), []);

    const groupByDay = useMemo(
        () => groupEventsByDay(paginatedEvents?.docs ?? [], eventsOnPage?.dateDirection === 'past'),
        [eventsOnPage?.dateDirection, paginatedEvents?.docs],
    );

    const eventsScrollAnchorRef = useRef<HTMLDivElement>(null);

    const handleSetPage = useCallback(async (newPage: number) => {
        setPage(newPage);
        await delayExecution(50);
        eventsScrollAnchorRef.current?.scrollIntoView({ behavior: 'instant' });
    }, []);

    const hasPagination =
        eventsOnPage?.pagination === true &&
        paginatedEvents !== undefined &&
        paginatedEvents.totalPages > 1;

    return (
        <div className="relative">
            <div ref={eventsScrollAnchorRef} className="absolute -top-52 md:-top-24" />

            {!isEmptyString(title) && (
                <div className="mb-3 text-center font-serif text-xl font-bold md:text-2xl">
                    {title}
                </div>
            )}

            <div className="md:text-lg">
                {allAvailableCategories.length > 1 && (
                    <div className="mb-3 flex flex-wrap px-4 sm:px-0">
                        <div
                            onClick={unsetFilteredEventType}
                            className="select-none border-r border-gray-800 px-3 leading-4 last:border-0 last:pr-0 md:cursor-pointer md:hover:text-orange-500"
                        >
                            <div
                                className={
                                    categories.length === 0
                                        ? 'text-orange-500 underline underline-offset-2 hover:text-gray-500'
                                        : ''
                                }
                            >
                                {locale === 'de' ? 'Alle' : 'All'}
                            </div>
                        </div>

                        {allAvailableCategories.map((eventCategory) => (
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
                    {groupByDay.length > 0 ? (
                        groupByDay.map(([date, events]) => (
                            <div key={date.toString()} className="mb-2">
                                <div className="bg-black px-3 py-1 font-serif font-bold text-white md:px-4 md:py-2">
                                    {formatDate(date, 'EE dd. MMMM yy', locale)}
                                </div>

                                {events.map((event, index) => (
                                    <EventOverviewEntry
                                        key={`event-${event.id}`}
                                        event={event}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="mb-2">
                            <div className="bg-black px-3 py-1 font-serif font-bold text-white md:px-4 md:py-2">
                                {locale === 'de' ? 'Nichts gefunden!' : 'Nothing found!'}
                            </div>

                            <div className="flex gap-3 py-1 md:py-2">
                                <div className="w-full">
                                    {locale === 'de'
                                        ? 'Hier gibt es aktuell keine Termine.'
                                        : 'There are currently no events.'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {hasPagination && (
                    <EventsPagination
                        paginatedEvents={paginatedEvents}
                        page={page}
                        setPage={handleSetPage}
                    />
                )}
            </div>
        </div>
    );
};

export default EventsOverview;
