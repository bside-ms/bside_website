import useSWR from 'swr';
import fetcher from '@/lib/common/fetcher';
import isNotEmptyNumber from '@/lib/common/helper/isNotEmptyNumber';
import type EventCategory from '@/lib/events/EventCategory';
import type EventsOnPage from '@/types/EventsOnPage';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

const useAllEvents = (
    eventsOnPage?: EventsOnPage,
    currentPage = 1,
    categories: Array<EventCategory> = [],
): PaginatedDocs<Event> | undefined => {
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

    if (categories.length > 0) {
        searchParams.set('categories', categories.join(','));
    }

    const { data } = useSWR<{ paginatedEvents: PaginatedDocs<Event> }>(
        `/api/events/all?${searchParams.toString()}`,
        fetcher,
        { keepPreviousData: true },
    );

    return data?.paginatedEvents;
};

export default useAllEvents;
