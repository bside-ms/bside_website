import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSideSitemapLegacy } from 'next-sitemap';
import { getEventIndex } from '@/lib/events';
import createCircleLink from '@/lib/events/createCircleLink';
import createEventSlug from '@/lib/events/createEventSlug';
import { getCircleIndex } from '@/lib/organisations';
import type { Circle, Event } from '@/types/payload/payload-types';

interface SiteIndexFields {
    loc: string;
    lastmod: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}

const generateStaticIndexes = (now: Date): Array<SiteIndexFields> => {
    return [
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
            lastmod: now.toISOString().split('T')[0]!,
            changefreq: 'daily',
            priority: 1,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/kultur`,
            lastmod: now.toISOString().split('T')[0]!,
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/quartier`,
            lastmod: now.toISOString().split('T')[0]!,
            changefreq: 'daily',
            priority: 0.9,
        },

        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/bside`,
            lastmod: now.toISOString().split('T')[0]!,
            changefreq: 'daily',
            priority: 0.8,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/bside/haus`,
            lastmod: now.toISOString().split('T')[0]!,
            changefreq: 'weekly',
            priority: 0.5,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/bside/kollektiv`,
            lastmod: now.toISOString().split('T')[0]!,
            changefreq: 'daily',
            priority: 0.8,
        },

        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/events`,
            lastmod: now.toISOString().split('T')[0]!,
            changefreq: 'daily',
            priority: 0.7,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/history`,
            lastmod: now.toISOString().split('T')[0]!,
            changefreq: 'daily',
            priority: 0.4,
        },

        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/kontakt`,
            lastmod: now.toISOString().split('T')[0]!,
            changefreq: 'weekly',
            priority: 0.4,
        },
    ];
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const now = new Date();
    const { locale } = ctx;

    const events = await getEventIndex();
    const circles = await getCircleIndex(locale!);

    const fields = generateStaticIndexes(now);

    events.forEach((event: Event) => {
        const eventDate = new Date(event.eventDate);
        const inPast = eventDate < now;

        fields.push({
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/${createEventSlug(event)}`,
            lastmod: new Date(event.updatedAt).toISOString().split('T')[0]!,
            priority: inPast ? 0.1 : 0.6,
            changefreq: inPast ? 'monthly' : 'daily',
        });
    });

    circles.forEach((circle: Circle) => {
        fields.push({
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${createCircleLink(circle)}`,
            lastmod: new Date(circle.updatedAt).toISOString().split('T')[0]!,
            priority: 0.5,
            changefreq: 'daily',
        });
    });

    return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap(): void {}
