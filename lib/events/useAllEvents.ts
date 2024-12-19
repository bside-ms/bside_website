import useSWR from 'swr';
import fetcher from '@/lib/common/fetcher';
import isNotEmptyNumber from '@/lib/common/helper/isNotEmptyNumber';
import type EventCategory from '@/lib/events/EventCategory';
import type EventsOnPage from '@/types/EventsOnPage';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';
import { DateRange } from 'react-day-picker';
import formatDate from '@/lib/common/helper/formatDate';

const useAllEvents = (
    eventsOnPage: EventsOnPage | undefined,
    currentPage: number,
    categories?: Array<EventCategory>,
    dateRange?: DateRange,
    depth?: number,
): [PaginatedDocs<Event> | undefined, boolean] => {
    const searchParams = new URLSearchParams();

    if (eventsOnPage?.dateDirection !== undefined) {
        searchParams.set('direction', eventsOnPage.dateDirection);
    }

    if (isNotEmptyNumber(eventsOnPage?.perPage)) {
        searchParams.set('page', currentPage.toString());
        searchParams.set('perPage', eventsOnPage.perPage.toString());
    }

    if (eventsOnPage?.filter !== undefined) {
        searchParams.set('filter', eventsOnPage.filter);
    }

    if (eventsOnPage?.ownerId !== undefined) {
        searchParams.set('ownerId', eventsOnPage.ownerId);
    }

    if (categories !== undefined && categories.length > 0) {
        searchParams.set('categories', categories.join(','));
    }

    if (dateRange !== undefined && dateRange.from !== undefined) {
        searchParams.set('from', formatDate(dateRange.from, 'yyyy-MM-dd'));

        if (dateRange.to !== undefined) {
            searchParams.set('to', formatDate(dateRange.to, 'yyyy-MM-dd'));
        }
    }

    if (depth !== undefined) {
        searchParams.set('depth', depth.toString());
    }

    const { data, isLoading } = useSWR<{ paginatedEvents: PaginatedDocs<Event> }>(
        `/api/events/all?${searchParams.toString()}`,
        fetcher,
    );

    return [data?.paginatedEvents, isLoading];
};

export default useAllEvents;
