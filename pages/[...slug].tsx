import hirestime from 'hirestime';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/Layout/ContentDivider';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import HeaderBar from '@/components/Layout/Header/HeaderBar';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import logger from '@/lib/common/logger';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Page } from '@/types/payload/payload-types';
import { RichText } from '@blocks/RichTextBlock';

interface Props {
    page: Page;
}

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Page>>('/api/pages/?limit=100');

    const paths = pages.docs.map(({ breadcrumbs, id }) => ({
        params: {
            slug: [breadcrumbs ? (breadcrumbs[breadcrumbs.length - 1]?.url?.substring(1) ?? id) : id],
        },
    }));

    return {
        fallback: 'blocking',
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {

    const getElapsed = hirestime();

    const rawSlug = params?.slug;

    if (rawSlug === undefined) {
        return { notFound: true };
    }

    const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug.join('/');

    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>('/api/pages/?limit=100');

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

    logger.info({
        message: 'timing',
        path: `/pages/[${slug}]`,
        time: getElapsed.seconds(),
    });

    return {
        revalidate: 60,
        props: {
            page,
        },
    };
};

export default ({ page }: Props): ReactElement => {

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <HeaderBar />

            <ContentDivider />

            <ContentWrapper>
                <div className="mb-2 mt-4 md:mb-3">
                    <div className="font-bold font-serif text-2xl md:text-4xl">
                        {page.title}
                    </div>

                    <RichText className="mt-1 text-sm sm:text-lg md:mt-3" content={page.richText} />
                </div>
            </ContentWrapper>

            <Footer />
        </main>
    );
};
