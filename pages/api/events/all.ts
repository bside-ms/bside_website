import type { NextApiRequest, NextApiResponse } from 'next';
import fetchPaginatedEvents from '@/lib/events/fetchPaginatedEvents';
import type { DateDirection, EventFilter } from '@/types/EventsOnPage';

export default async (
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> => {

    const getParam = <T = string>(key: string): T | undefined => {

        const queryValue = request.query[key];

        if (typeof queryValue === 'string' && queryValue !== '') {
            return queryValue as T;
        }

        return undefined;
    };

    const page = getParam('page');
    const perPage = getParam('perPage');
    const direction = getParam<DateDirection>('direction');
    const filter = getParam<EventFilter>('filter');
    const ownerId = getParam('ownerId');

    const paginatedEvents = await fetchPaginatedEvents({ page, perPage, direction, filter, ownerId });

    response.status(200).json({ paginatedEvents });
};
