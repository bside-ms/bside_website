import { useLivePreview } from '@payloadcms/live-preview-react';
import type { GetStaticPaths } from 'next';
import type { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
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

const reservedSlugs: Array<string> = ['bside', 'home', 'kultur', 'quartier'];

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const pages = await getPayloadResponse<PaginatedDocs<Page>>('/api/pages/?limit=9999');
    const filtered = pages.docs.filter(({ slug }) => {
        return slug !== undefined && slug !== null && !reservedSlugs.includes(slug);
    });

    const paths = filtered
        .map(({ breadcrumbs }) =>
            locales!.map((locale) => ({
                params: {
                    slug: breadcrumbs![breadcrumbs!.length - 1]?.url?.substring(1).split('/'),
                },
                locale,
            })),
        )
        .flat();

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

const fetchPage = async (slug: string, locale: string): Promise<Page | undefined> => {
    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>(
        `/api/pages/?limit=9999&locale=${locale}`,
    );

    let page = pagesResponse.docs.find((doc) => {
        if (doc.breadcrumbs === undefined || doc.breadcrumbs === null) {
            return;
        }

        let breadcrumbs = doc.breadcrumbs[doc.breadcrumbs.length - 1]?.url ?? '';
        if (breadcrumbs.startsWith('/')) {
            breadcrumbs = breadcrumbs.substring(1);
        }

        return breadcrumbs === `${slug}`;
    });

    if (page === undefined) {
        page = pagesResponse.docs.find((doc) => {
            return doc.id === `${slug}`;
        });
    }

    return page;
};

const fetchRedirect = async (slug: string): Promise<Redirect | undefined> => {
    const redirectResponse = await getPayloadResponse<PaginatedDocs<Redirect>>(
        '/api/redirects/?limit=9999',
    );

    return redirectResponse.docs.find((doc) => {
        return doc.from === `/${slug}`;
    });
};

export const getStaticProps: ({
    params,
    locale,
}: {
    params: NextParsedUrlQuery;
    locale: string;
}) => Promise<
    | { notFound: boolean }
    | { redirect: { permanent: boolean; destination: string | null | undefined } }
    | { revalidate: number; props: { page: Page } }
> = async ({ params, locale }) => {
    const slug = getSlug(params.slug);
    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const page = await fetchPage(slug, locale);

    if (page === undefined) {
        const redirect = await fetchRedirect(slug);
        if (redirect !== undefined) {
            return {
                redirect: {
                    destination: redirect.to!.url,
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
            locale,
        },
    };
};

export default ({ page }: Props): ReactElement => {
    const { locale } = useRouter();

    const { data } = useLivePreview({
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
        depth: 1,
        initialData: page,
    });

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <NextHead
                title={data.meta?.title ?? `${data.title} | B-Side Münster`}
                description={
                    data.meta?.description ??
                    'Selbstorganisierter und offener Ort der Möglichkeiten am Münsteraner Hafen'
                }
                url={`${getPublicClientUrl(locale)}/${data.slug}`}
            />
            <HeaderBar />

            <div className="mt-[60px]" />

            <main id="content">
                <ReusableBlockLayout layout={data.layout} />
            </main>

            <Footer />
        </div>
    );
};
