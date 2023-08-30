import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import Banner from '@/components/layout/Banner';
import ContentDivider from '@/components/layout/ContentDivider';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { getPublicClientUrl } from '@/lib/common/url';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Page } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    page: Page;
    preview: boolean;
}

const reservedSlugs: Array<string> = [
    'bside',
];

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Page>>('/api/pages/?limit=100');

    const filtered = pages.docs.filter(({ slug }) => {
        return slug !== undefined && !reservedSlugs.includes(slug);
    });

    const paths = filtered.map(({ breadcrumbs, id }) => ({
        params: {
            slug: [breadcrumbs ? (breadcrumbs[breadcrumbs.length - 1]?.url?.substring(1) ?? id) : id],
        },
    }));

    return {
        fallback: 'blocking',
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params, preview }) => {

    const rawSlug = params?.slug;

    if (rawSlug === undefined) {
        return { notFound: true };
    }

    const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug.join('/');

    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>('/api/pages/?limit=100', preview);

    let page = pagesResponse.docs.find(doc => {
        if (doc.breadcrumbs === undefined) {
            return;
        }

        let breadcrumbs = doc.breadcrumbs[doc.breadcrumbs.length - 1]?.url ?? '';
        if (breadcrumbs.startsWith('/')) {
            breadcrumbs = breadcrumbs.substring(1);
        }

        return breadcrumbs === `${slug}`;
    });

    if (page === undefined) {
        page = pagesResponse.docs.find(doc => {
            return doc.id === `${slug}`;
        });
    }

    if (page === undefined) {
        return { notFound: true };
    }

    return {
        revalidate: 60,
        props: {
            page,
            preview: preview ?? false,
        },
    };
};

export default ({ page, preview }: Props): ReactElement => {

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NextHead
                title={page.meta?.title ?? `${page.title} | B-Side Münster`}
                description={page.meta?.description ?? 'Selbstorganisierter und offener Ort der Möglichkeiten am Münsteraner Hafen'}
                url={`${getPublicClientUrl()}/${page.slug}`}
            />
            <HeaderBar />

            {preview && (
                <Banner
                    bannerId="preview"
                    bannerText="Preview"
                    bannerLink=""
                    footerInView={false}
                    isPreview={preview}
                />
            )}

            <ContentDivider />

            <main id="content">
                <ReusableBlockLayout
                    layout={page.layout}
                />
            </main>

            <Footer />
        </div>
    );
};
