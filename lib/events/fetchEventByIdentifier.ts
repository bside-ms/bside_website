import createEventSlug from '@/lib/events/createEventSlug';
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

    // The identifier (last four characters of the id) is not unique.
    // A single match is returned as is, so links keep working after the title or slug changed.
    if (response.docs.length === 1) {
        return response.docs[0];
    }

    return response.docs.find((event) => createEventSlug(event) === slug);
};

export default fetchEventByIdentifier;
