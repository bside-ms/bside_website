import createCircleLink from '@/lib/events/createCircleLink';
import createOrganisationLink from '@/lib/events/createOrganisationLink';
import type { Circle, Organisation } from '@/types/payload/payload-types';

enum NewsCategoriesDe {
    news = 'Aktuelles',
    announcements = 'Ankündigungen',
}

enum NewsCategoriesEn {
    news = 'News',
    announcements = 'Announcements',
}

export const getCircleOrOrganisationName = (data: Array<{ value: string | Organisation, relationTo: 'organisations' } | { value: string | Circle, relationTo: 'circles'}> | null | undefined): string => {

    if (data === null || data === undefined) {
        return '';
    }

    const str: Array<string> = [];

    data.map((owner) => {
        if (owner.relationTo === 'organisations') {
            const organisation: Organisation = owner.value as Organisation;
            str.push(`<Link class=""  href="${createOrganisationLink(organisation)}" >${organisation.name}</Link>`);
            return;
        }

        const circle: Circle = owner.value as Circle;
        str.push(`<Link href="${createCircleLink(circle)}">${circle.name}</Link>`);
    });

    return str.join(' - ');
};

export const getNewsCategory = (category: string, locale: string): string => {
    if (locale === 'de') {
        return NewsCategoriesDe[category as keyof typeof NewsCategoriesDe];
    }

    return NewsCategoriesEn[category as keyof typeof NewsCategoriesEn];
};