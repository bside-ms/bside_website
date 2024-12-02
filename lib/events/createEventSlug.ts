import { kebabCase } from 'lodash-es';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import type { Event } from '@/types/payload/payload-types';

export const createEventSlug = (event: Event): string => {
    if (isNotEmptyString(event.slug)) {
        return `${event.id.slice(-4)}-${kebabCase(event.slug)}`;
    }

    return `${event.id.slice(-4)}-${kebabCase(event.title)}`;
};

export const createEventSlugOld = (event: Event): string => {
    if (isNotEmptyString(event.slug)) {
        return event.slug;
    }

    return `${kebabCase(event.title)}-${event.id.slice(-4)}`;
};

export default createEventSlug;
