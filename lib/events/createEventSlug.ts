import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import type { Event } from '@/types/payload/payload-types';

const createEventSlug = (event: Event): string => {

    if (isNotEmptyString(event.slug)) {
        return event.slug;
    }

    const titleForSlug = encodeURIComponent(
        event.title.toLocaleLowerCase().replaceAll(/\s/g, '-')
    );

    return `${titleForSlug}-${event.id}`;
};

export default createEventSlug;
