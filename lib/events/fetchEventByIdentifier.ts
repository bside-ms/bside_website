import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

const fetchEventByIdentifier = async (slug: string, locale: string): Promise<Event | undefined> => {
    // Check if it matches the new slug format.
    if (!(/^[a-zA-Z0-9]{4}-/.test(slug) && slug.length >= 5)) {
        return undefined;
    }

    const identifier = slug.slice(0, 4);
    const response = await getPayloadResponse<PaginatedDocs<Event>>(
        `/api/events/?where[identifier][equals]=${identifier}&locale=${locale}`,
    );
    return response.docs[0] ?? undefined;
};

export default fetchEventByIdentifier;
