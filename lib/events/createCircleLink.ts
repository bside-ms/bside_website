import { kebabCase } from 'lodash-es';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { Circle, Organisation } from '@/types/payload/payload-types';

const createCircleLink = (circle: Circle): string => {
    const organisation = circle.organisation as Organisation;
    const slug = !isEmptyString(circle.name) ? circle.name : circle.id;
    return `/${organisation.shortName}/${kebabCase(slug)}`;
};

export default createCircleLink;
