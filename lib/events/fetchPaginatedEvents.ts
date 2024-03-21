import formatDate from '@/lib/common/helper/formatDate';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
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
    categories = null,
    depth = null,
}: {
    page?: string | number | null;
    perPage?: string | number | null;
    direction?: DateDirection | null;
    filter?: EventFilter | null;
    ownerId?: string | null;
    categories?: string | null;
    depth?: string | number | null;
}): Promise<PaginatedDocs<Event>> => {
    const searchParams = new URLSearchParams();

    searchParams.append('page', page?.toString() ?? '1');
    searchParams.append('limit', perPage?.toString() ?? '99999');

    if (direction === 'past') {
        searchParams.append('where[eventDate][less_than]', formatDate(new Date(), 'yyyy-MM-dd'));
        searchParams.append('sort', '-eventDate');
    } else {
        searchParams.append('where[eventDate][greater_than]', formatDate(new Date(), 'yyyy-MM-dd'));
        searchParams.append('sort', 'eventDate');
    }

    if (filter !== null) {
        searchParams.append(`where[displayOn${filter}][equals]`, 'true');
    }

    if (ownerId !== null) {
        searchParams.append('where[eventOwner.value][equals]', ownerId);
    }

    if (categories !== null) {
        searchParams.append('where[category][in]', categories.split(',').filter(isNotEmptyString).join(','));
    }

    if (depth !== null) {
        searchParams.append('depth', depth.toString());
    }

    return getPayloadResponse<PaginatedDocs<Event>>(`/api/events/?${searchParams.toString()}`);
};

export default fetchPaginatedEvents;
