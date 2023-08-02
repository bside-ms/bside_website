import type { Organisation } from '@/types/payload/payload-types';

const createOrganisationLink = (organisation: Organisation): string => {
    return `/${organisation.shortName}`;
};

export default createOrganisationLink;
