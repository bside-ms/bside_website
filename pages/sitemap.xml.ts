import { format, isPast } from 'date-fns';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSideSitemapLegacy } from 'next-sitemap';
import createCircleLink from '@/lib/events/createCircleLink';
import createEventSlug from '@/lib/events/createEventSlug';
import fetchAllEvents from '@/lib/events/fetchAllEvents';
import { createNewsSlug, getNewsIndex } from '@/lib/news/news';
import { getCircleIndex } from '@/lib/organisations';
import type { Circle, Event, News } from '@/types/payload/payload-types';

interface SiteIndexFields {
    loc: string;
    lastmod: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}

const generateStaticIndexes = (): Array<SiteIndexFields> => {
    const today = format(new Date(), 'yyyy-MM-dd');

    return [
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
            lastmod: today,
            changefreq: 'daily',
            priority: 1,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/kultur`,
            lastmod: today,
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/kultur/spenden`,
            lastmod: today,
            changefreq: 'weekly',
            priority: 0.4,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/kultur/impressum`,
            lastmod: today,
            changefreq: 'weekly',
            priority: 0.4,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/kultur/hansawerkstatt/spenden`,
            lastmod: today,
            changefreq: 'weekly',
            priority: 0.4,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/quartier`,
            lastmod: today,
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/quartier/unterstuetzen`,
            lastmod: today,
            changefreq: 'weekly',
            priority: 0.4,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/news`,
            lastmod: today,
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/bside`,
            lastmod: today,
            changefreq: 'daily',
            priority: 0.8,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/bside/haus`,
            lastmod: today,
            changefreq: 'weekly',
            priority: 0.5,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/bside/kollektiv`,
            lastmod: today,
            changefreq: 'daily',
            priority: 0.8,
        },

        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/events`,
            lastmod: today,
            changefreq: 'daily',
            priority: 0.7,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/history`,
            lastmod: today,
            changefreq: 'daily',
            priority: 0.4,
        },
        {
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/impressum`,
            lastmod: today,
            changefreq: 'weekly',
            priority: 0.4,
        },
    ];
};

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { locale } = ctx;

    const events = await fetchAllEvents();
    const circles = await getCircleIndex(locale!);
    const news = await getNewsIndex();

    const fields = generateStaticIndexes();

    events.forEach((event: Event) => {
        const inPast = isPast(event.eventDate);

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

    news.forEach((newsItem: News) => {
        fields.push({
            loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/news/${createNewsSlug(newsItem)}`,
            lastmod: new Date(newsItem.updatedAt).toISOString().split('T')[0]!,
            priority: 0.5,
            changefreq: 'daily',
        });
    });

    // ToDo: Pages are missing.

    return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap(): void {}
