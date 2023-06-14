import type { Circle, Organisation } from 'types/payload/payload-types';

const createCircleLink = (circle: Circle): string => {
    const organisation = circle.organisation as Organisation;
    return `/${organisation.shortName}/${circle.id}`;
};

export default createCircleLink;
