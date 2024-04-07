import type { NextApiRequest, NextApiResponse } from 'next';
import getQueryParam from '@/lib/common/helper/getQueryParam';
import fetchPaginatedEvents from '@/lib/events/fetchPaginatedEvents';
import getCategoriesFromEvents from '@/lib/events/getCategoriesFromEvents';
import type { DateDirection, EventFilter } from '@/types/EventsOnPage';

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
    const direction = getQueryParam<DateDirection>(request, 'direction');
    const filter = getQueryParam<EventFilter>(request, 'filter');
    const ownerId = getQueryParam(request, 'ownerId');

    const paginatedEvents = await fetchPaginatedEvents({ direction, filter, ownerId, depth: 1 });

    const categoryFilters = getCategoriesFromEvents(paginatedEvents.docs);

    response.status(200).json({ categoryFilters });
};
