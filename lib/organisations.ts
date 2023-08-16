import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle } from '@/types/payload/payload-types';

export const getCirclesOfOrganisation = async (organisationId: string): Promise<Array<Circle>> => {
    const circles = await getPayloadResponse<PaginatedDocs<Circle>>(
        `/api/circles/?where[organisation][equals]=${organisationId}&sort=name&depth=1`
    );

    return circles.docs;
};
