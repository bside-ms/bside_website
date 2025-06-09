import useSWR from 'swr';
import fetcher from '@/lib/common/fetcher';
import type EventCategory from '@/lib/events/EventCategory';
import type EventsOnPage from '@/types/EventsOnPage';

const useAvailableCategoryFilters = (eventsOnPage?: Pick<EventsOnPage, 'dateDirection' | 'filter' | 'ownerId'>): Array<EventCategory> => {
    const searchParams = new URLSearchParams();

    if (eventsOnPage?.dateDirection !== undefined) {
        searchParams.set('direction', eventsOnPage.dateDirection);
    }

    if (eventsOnPage?.filter !== undefined) {
        searchParams.set('filter', eventsOnPage.filter);
    }

    if (eventsOnPage?.ownerId !== undefined) {
        searchParams.set('ownerId', eventsOnPage.ownerId);
    }

    const { data } = useSWR<{ categoryFilters: Array<EventCategory> }>(`/api/events/categoryFilters?${searchParams.toString()}`, fetcher, {
        keepPreviousData: true,
    });

    return data?.categoryFilters ?? [];
};

export default useAvailableCategoryFilters;
