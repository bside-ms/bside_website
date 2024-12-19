import type { Media as MediaType } from '@/types/payload/payload-types';
import isEventImageString from '@/lib/events/isEventImageString';
import isEventImageMedia from '@/lib/events/isEventImageMedia';

const getEventImageUrl = (image: MediaType | string | null | undefined): string | null => {
    if (isEventImageString(image)) {
        return image;
    }

    if (isEventImageMedia(image)) {
        return image.sizes?.event?.url ?? image.sizes?.thumbnail?.url ?? image.url ?? null;
    }

    return null;
};

export default getEventImageUrl;
