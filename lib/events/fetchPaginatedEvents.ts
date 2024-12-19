import formatDate from '@/lib/common/helper/formatDate';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type { DateDirection, EventFilter } from '@/types/EventsOnPage';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';
import { stringify } from 'qs-esm';
import { endOfDay, formatISO, startOfDay } from 'date-fns';

const fetchPaginatedEvents = ({
    page = null,
    perPage = null,
    direction = null,
    filter = null,
    ownerId = null,
    categories = null,
    fromDate = null,
    toDate = null,
    depth = null,
}: {
    page?: string | number | null;
    perPage?: string | number | null;
    direction?: DateDirection | null;
    filter?: EventFilter | null;
    ownerId?: string | null;
    categories?: string | null;
    fromDate?: string | null;
    toDate?: string | null;
    depth?: string | number | null;
}): Promise<PaginatedDocs<Event>> => {
    const queryObject: {
        page: string;
        limit: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        where: Record<any, any>;
        sort?: string;
        depth?: string;
    } = {
        page: page?.toString() ?? '1',
        limit: perPage?.toString() ?? '99999',
        where: {},
    };

    if (fromDate !== null) {
        try {
            if (toDate === null) {
                queryObject.where.and = [
                    {
                        eventDate: {
                            greater_than_equal: formatISO(startOfDay(new Date(fromDate))),
                        },
                    },
                    {
                        eventDate: {
                            less_than_equal: formatISO(endOfDay(new Date(fromDate))),
                        },
                    },
                ];
            } else {
                queryObject.where.and = [
                    {
                        eventDate: {
                            greater_than_equal: formatISO(startOfDay(new Date(fromDate))),
                        },
                    },
                    {
                        eventDate: {
                            less_than_equal: formatISO(endOfDay(new Date(toDate))),
                        },
                    },
                ];
            }
        } catch {
            // Probably wrong date format
        }
    } else if (direction === 'past') {
        queryObject.where.eventDate = { less_than: formatDate(new Date(), 'yyyy-MM-dd') };
        queryObject.sort = '-eventDate';
    } else {
        queryObject.where.eventDate = { greater_than: formatDate(new Date(), 'yyyy-MM-dd') };
        queryObject.sort = 'eventDate';
    }

    if (filter !== null) {
        queryObject.where[`displayOn${filter}`] = { equals: true };
    }

    if (ownerId !== null) {
        queryObject.where['eventOwner.value'] = { equals: ownerId };
    }

    if (categories !== null) {
        queryObject.where.category = {
            in: categories.split(',').filter(isNotEmptyString).join(','),
        };
    }

    if (depth !== null) {
        queryObject.depth = depth.toString();
    }

    return getPayloadResponse<PaginatedDocs<Event>>(`/api/events/?${stringify(queryObject)}`);
};

export default fetchPaginatedEvents;
