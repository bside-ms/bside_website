import { addDays, subDays } from 'date-fns';
import formatDate from '@/lib/common/helper/formatDate';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type { DateDirection, EventFilter } from '@/types/EventsOnPage';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

const fetchPaginatedEvents = ({
    page = null,
    perPage = null,
    direction = null,
    filter = null,
    ownerId = null,
}: {
    page?: string | null;
    perPage?: string | null;
    direction?: DateDirection | null;
    filter?: EventFilter | null;
    ownerId?: string | null;
}): Promise<PaginatedDocs<Event>> => {
    const searchParams = new URLSearchParams();

    searchParams.append('page', page ?? '1');
    searchParams.append('limit', perPage ?? '99999');

    if (direction === 'past') {
        searchParams.append('where[eventDate][less_than]', formatDate(addDays(new Date(), 1), 'yyyy-MM-dd'));
        searchParams.append('sort', '-eventDate');
    } else {
        searchParams.append('where[eventDate][greater_than]', formatDate(subDays(new Date(), 1), 'yyyy-MM-dd'));
        searchParams.append('sort', 'eventDate');
    }

    if (filter !== null) {
        searchParams.append(`where[displayOn${filter}][equals]`, 'true');
    }

    if (ownerId !== null) {
        searchParams.append('where[eventOwner.value][equals]', ownerId);
    }

    return getPayloadResponse<PaginatedDocs<Event>>(`/api/events/?${searchParams.toString()}`);
};

export default fetchPaginatedEvents;
