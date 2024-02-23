import { kebabCase } from 'lodash';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle, News, Organisation } from '@/types/payload/payload-types';

enum NewsCategoriesDe {
    news = 'Aktuelles',
    announcements = 'Ankündigungen',
}

enum NewsCategoriesEn {
    news = 'News',
    announcements = 'Announcements',
}

export const fetchNewsByIdentifier = async (slug: string, locale: string): Promise<News | undefined> => {
    // Check if it matches the new slug format.
    if (!(/^[a-zA-Z0-9]{4}-/.test(slug) && slug.length >= 5)) {
        return undefined;
    }

    const identifier = slug.slice(0, 4);
    const response = await getPayloadResponse<PaginatedDocs<News>>(`/api/news/?where[identifier][equals]=${identifier}&locale=${locale}`);
    return response.docs[0] ?? undefined;
};

export const getCircleOrOrganisationName = (data: Array<{ value: string | Organisation, relationTo: 'organisations' } | { value: string | Circle, relationTo: 'circles'}> | null | undefined): string => {

    if (data === null || data === undefined) {
        return '';
    }

    const str: Array<string> = [];

    data.map((owner) => {
        if (owner.relationTo === 'organisations') {
            const organisation: Organisation = owner.value as Organisation;
            str.push(`${organisation.name}`);
            return;
        }

        const circle: Circle = owner.value as Circle;
        str.push(`${circle.name}`);
    });

    return str.join(' - ');
};

export const getNewsCategory = (category: string, locale: string): string => {
    if (locale === 'de') {
        return NewsCategoriesDe[category as keyof typeof NewsCategoriesDe];
    }

    return NewsCategoriesEn[category as keyof typeof NewsCategoriesEn];
};

export const createNewsSlug = (news: News): string => {
    if (isNotEmptyString(news.slug)) {
        return `${news.id.slice(-4)}-${kebabCase(news.slug)}`;
    }

    return `${news.id.slice(-4)}-${kebabCase(news.title)}`;
};
