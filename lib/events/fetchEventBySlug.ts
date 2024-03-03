import createEventSlug from '@/lib/events/createEventSlug';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

const fetchEventBySlug = async (slug: string): Promise<Event | undefined> => {

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/?limit=9999&depth=1');

    return pagesResponse.docs.find(eventItem => createEventSlug(eventItem) === slug);
};

export default fetchEventBySlug;
