import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import EventOverviewEntry from '@/components/events/overview/EventOverviewEntry';
import EventsPagination from '@/components/events/overview/EventsPagination';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type EventCategory from '@/lib/events/EventCategory';
import groupEventsByDay from '@/lib/events/groupEventsByDay';
import useAllEvents from '@/lib/events/useAllEvents';
import type EventsOnPage from '@/types/EventsOnPage';
import EventsCategoriesFilter from '@/components/events/overview/EventsCategoriesFilter';
import { range } from 'lodash-es';
import EventOverviewEntryPlaceholder from '@/components/events/overview/EventOverviewEntryPlaceholder';
import EventsDateRangeFilter from '@/components/events/overview/EventsDateRangeFilter';
import useFormatDate from '@/lib/common/hooks/useFormatDate';
import { DateRange } from 'react-day-picker';
import { addMonths, subMonths } from 'date-fns';

interface Props {
    title?: string;
    eventsOnPage?: EventsOnPage;
}

const EventsOverview = ({ title = '', eventsOnPage }: Props): ReactElement => {
    const [page, setPage] = useState(1);

    const [filteredCategories, setFilteredCategories] = useState<Array<EventCategory>>([]);
    const [filteredDateRange, setFilteredDateRange] = useState<DateRange | undefined>();

    const [paginatedEvents, isLoading] = useAllEvents(eventsOnPage, page, filteredCategories, filteredDateRange);

    const areDisplayedOnHome = eventsOnPage?.filter === 'Home';

    const [allEvents] = useAllEvents(
        {
            perPage: 9999,
            filter: eventsOnPage?.filter,
            ownerId: eventsOnPage?.ownerId,
        },
        1,
        filteredCategories,
        { from: subMonths(new Date(), 3), to: addMonths(new Date(), 12) },
        0,
    );

    useEffect(() => {
        if (paginatedEvents === undefined || isLoading) {
            return;
        }

        if (paginatedEvents.totalPages < page) {
            setPage(paginatedEvents.totalPages);
        } else if (paginatedEvents.page !== undefined && paginatedEvents.page !== page) {
            setPage(paginatedEvents.page);
        }
    }, [paginatedEvents]);

    const locale = useLocale();

    const groupByDay = useMemo(
        () => groupEventsByDay(paginatedEvents?.docs ?? [], eventsOnPage?.dateDirection === 'past'),
        [eventsOnPage?.dateDirection, paginatedEvents?.docs],
    );

    const eventsScrollAnchorRef = useRef<HTMLDivElement>(null);

    const handleSetPage = useCallback((newPage: number) => {
        setPage(newPage);

        eventsScrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const hasPagination = eventsOnPage?.withPagination === true && paginatedEvents !== undefined && paginatedEvents.totalPages > 1;

    const formatDate = useFormatDate();

    return (
        <div className="relative">
            <div ref={eventsScrollAnchorRef} className="absolute -top-32 md:-top-24" />

            {!isEmptyString(title) && <div className="mb-3 text-center font-serif text-xl font-bold md:text-2xl">{title}</div>}

            {eventsOnPage?.withFilters === true && (
                <div className="mb-3 flex gap-3">
                    <EventsCategoriesFilter
                        eventsOnPage={eventsOnPage}
                        filteredCategories={filteredCategories}
                        setFilteredCategories={setFilteredCategories}
                    />

                    <EventsDateRangeFilter
                        filteredDateRange={filteredDateRange}
                        setFilteredDateRange={setFilteredDateRange}
                        allEventDates={allEvents?.docs.map((event) => new Date(event.eventDate)) ?? []}
                    />
                </div>
            )}

            <div className="md:text-lg">
                <div>
                    {isLoading ? (
                        range(eventsOnPage?.perPage ?? 5).map((index) => (
                            <div key={index} className="mb-6 space-y-4">
                                <div className="bg-gray-300 px-3 py-1 font-serif font-bold text-white md:px-4 md:py-2">&nbsp;</div>

                                <EventOverviewEntryPlaceholder key={index} />
                            </div>
                        ))
                    ) : groupByDay.length > 0 ? (
                        groupByDay.map(([date, events]) => (
                            <div key={date.toString()} className="mb-6 space-y-2.5">
                                <div className="bg-black px-3 py-1 font-serif font-bold text-white md:px-4 md:py-2">
                                    {formatDate(date, 'EE dd. MMMM yy')}
                                </div>

                                {events.map((event) => (
                                    <EventOverviewEntry key={event.id} event={event} areDisplayedOnHome={areDisplayedOnHome} />
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
                                    {locale === 'de' ? 'Hier gibt es aktuell keine Termine.' : 'There are currently no events.'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {hasPagination && <EventsPagination paginatedEvents={paginatedEvents} page={page} setPage={handleSetPage} />}
            </div>
        </div>
    );
};

export default EventsOverview;
