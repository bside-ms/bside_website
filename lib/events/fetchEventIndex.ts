import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';
import { stringify } from 'qs-esm';
import { formatISO, startOfDay, subDays } from 'date-fns';

export type EventIndexEntry = Pick<Event, 'id' | 'slug' | 'title' | 'eventDate' | 'updatedAt'>;

/**
 * Fetches only the fields needed for links (`createEventSlug`) and the sitemap.
 * With `pastDays`, only events from `pastDays` days ago onwards are returned.
 */
const fetchEventIndex = async (pastDays: number | null = null): Promise<Array<EventIndexEntry>> => {
    const query = stringify({
        depth: 0,
        limit: 99999,
        select: { slug: true, title: true, eventDate: true, updatedAt: true },
        ...(pastDays !== null && {
            where: {
                eventDate: { greater_than_equal: formatISO(startOfDay(subDays(new Date(), pastDays))) },
            },
        }),
    });

    const paginatedDocs = await getPayloadResponse<PaginatedDocs<EventIndexEntry>>(`/api/events/?${query}`);

    return paginatedDocs.docs;
};

export default fetchEventIndex;
