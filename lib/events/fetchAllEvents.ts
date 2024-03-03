import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

const fetchAllEvents = async (): Promise<Array<Event>> => {

    const paginatedDocs = await getPayloadResponse<PaginatedDocs<Event>>(
        '/api/events/?depth=0&page=1&sort=id&limit=99999'
    );

    return paginatedDocs.docs;
};

export default fetchAllEvents;
