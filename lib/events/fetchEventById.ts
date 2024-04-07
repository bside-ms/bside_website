import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type { Event } from '@/types/payload/payload-types';

const fetchEventById = async (id: string): Promise<Event | undefined> => {
    try {
        return await getPayloadResponse<Event>(`/api/events/${id}`);
    } catch {
        return undefined;
    }
};

export default fetchEventById;
