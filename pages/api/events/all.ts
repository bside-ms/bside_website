import type { NextApiRequest, NextApiResponse } from 'next';
import getQueryParam from '@/lib/common/helper/getQueryParam';
import fetchPaginatedEvents from '@/lib/events/fetchPaginatedEvents';
import type { DateDirection, EventFilter } from '@/types/EventsOnPage';

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
    const page = getQueryParam(request, 'page');
    const perPage = getQueryParam(request, 'perPage');
    const direction = getQueryParam<DateDirection>(request, 'direction');
    const filter = getQueryParam<EventFilter>(request, 'filter');
    const ownerId = getQueryParam(request, 'ownerId');
    const categories = getQueryParam(request, 'categories');

    const paginatedEvents = await fetchPaginatedEvents({
        page,
        perPage,
        direction,
        filter,
        ownerId,
        categories,
    });

    response.status(200).json({ paginatedEvents });
};
