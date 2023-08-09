import { kebabCase } from 'lodash';
import type { Circle, Organisation } from '@/types/payload/payload-types';

const createCircleLink = (circle: Circle): string => {
    const organisation = circle.organisation as Organisation;
    return `/${organisation.shortName}/${kebabCase(circle.name)}`;
};

export default createCircleLink;
