import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle, Organisation } from '@/types/payload/payload-types';

export const getCirclesOfOrganisation = async (organisationId: string, locale: string): Promise<Array<Circle>> => {
    const circles = await getPayloadResponse<PaginatedDocs<Circle>>(
        `/api/circles/?where[organisation][equals]=${organisationId}&sort=name&depth=1&locale=${locale}`,
    );

    return circles.docs;
};

export const getAllCircles = async (locale: string): Promise<Array<Circle>> => {
    const circles = await getPayloadResponse<PaginatedDocs<Circle>>(`/api/circles/?sort=name&depth=1&limit=9999&locale=${locale}`);

    return circles.docs;
};

export const getCircleIndex = async (locale: string): Promise<Array<Circle>> => {
    const circles = await getPayloadResponse<PaginatedDocs<Circle>>(`/api/circles/?depth=1&limit=9999&locale=${locale}`);

    return circles.docs;
};

export const getOrganisation = async (organisationId: string, locale: string): Promise<Organisation> => {
    const organisation = await getPayloadResponse<PaginatedDocs<Organisation>>(
        `/api/organisations/?where[_id][equals]=${organisationId}&locale=${locale}`,
    );

    return organisation.docs[0]!;
};

export const getCircle = async (circleId: string, locale: string): Promise<Circle> => {
    const circle = await getPayloadResponse<PaginatedDocs<Circle>>(`/api/circles/?where[_id][equals]=${circleId}&locale=${locale}`);

    return circle.docs[0]!;
};
