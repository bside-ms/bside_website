import { useLivePreview } from '@payloadcms/live-preview-react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/layout/ContentDivider';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { getPublicClientUrl } from '@/lib/common/url';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Page, Redirect } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    page: Page;
}

const reservedSlugs: Array<string> = [
    'bside',
    'home',
    'kultur',
];

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Page>>('/api/pages/?limit=9999');
    const filtered = pages.docs.filter(({ slug }) => {
        return slug !== undefined && !reservedSlugs.includes(slug);
    });

    const paths = filtered.map(({ breadcrumbs }) => ({
        params: {
            slug: breadcrumbs![breadcrumbs!.length - 1]?.url?.substring(1).split('/'),
        },
    }));

    return {
        fallback: 'blocking',
        paths,
    };
};

const getSlug = (slug: string | Array<string> | undefined): string => {
    if (slug === undefined) {
        return '';
    }

    return typeof slug === 'string' ? slug : slug.join('/');
};

const fetchPage = async (slug: string): Promise<Page | undefined> => {
    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>('/api/pages/?limit=9999');
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

    return page;
};

const fetchRedirect = async (slug: string): Promise<Redirect | undefined> => {
    const redirectResponse = await getPayloadResponse<PaginatedDocs<Redirect>>('/api/redirects/?limit=9999');
    const redirect = redirectResponse.docs.find(doc => {
        return doc.from === `/${slug}`;
    });

    return redirect;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params, preview }) => {

    const slug = getSlug(params?.slug);
    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const page = await fetchPage(slug);

    if (page === undefined) {
        const redirect = await fetchRedirect(slug);
        if (redirect !== undefined) {
            return {
                redirect: {
                    destination: redirect.to.url,
                    permanent: false,
                },
            };
        }

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

export default ({ page }: Props): ReactElement => {

    const { data } = useLivePreview({
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
        depth: 1,
        initialData: page,
    });

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NextHead
                title={data.meta?.title ?? `${data.title} | B-Side Münster`}
                description={data.meta?.description ?? 'Selbstorganisierter und offener Ort der Möglichkeiten am Münsteraner Hafen'}
                url={`${getPublicClientUrl()}/${data.slug}`}
            />
            <HeaderBar />

            <ContentDivider mt={true} />

            <main id="content">
                <ReusableBlockLayout
                    layout={data.layout}
                />
            </main>

            <Footer />
        </div>
    );
};
