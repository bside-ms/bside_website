import { kebabCase } from 'lodash';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import type { Event } from '@/types/payload/payload-types';

const createEventSlug = (event: Event): string => {

    if (isNotEmptyString(event.slug)) {
        return event.slug;
    }

    return `${kebabCase(event.title)}-${event.id.slice(-4)}`;
};

export default createEventSlug;
