import hirestime from 'hirestime';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/common/ContentWrapper';
import Footer from '@/components/common/Footer';
import HeaderBar from '@/components/common/HeaderBar';
import Navigation from '@/components/navigation/Navigation';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import logger from '@/lib/common/logger';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import serializeRichTextToHtml from '@/lib/payload/serializeRichTextToHtml';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { MainMenu, Page } from '@/types/payload/payload-types';

interface Props {
    page?: Page;
    mainMenu?: MainMenu;
}

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Page>>('/api/pages/?limit=100');

    const paths = pages.docs.map(({ breadcrumbs, id }) => ({
        params: {
            slug: [breadcrumbs ? (breadcrumbs[breadcrumbs.length - 1]?.url?.substring(1) ?? id) : id],
        },
    }));

    return {
        fallback: true,
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {

    const getElapsed = hirestime();

    const rawSlug = context.params?.slug;

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
            mainMenu: (await getPayloadResponse<MainMenu>('/api/globals/main-menu/')),
        },
    };
};

export default ({ page, mainMenu }: Props): ReactElement => {

    if (!page) {
        return <main className="min-h-screen flex flex-col justify-between" />;
    }

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <Navigation />

            <HeaderBar
                disableLeftLogo={false}
                headerMenu={true}
                mainMenu={mainMenu}
            />

            <ContentWrapper>
                <div className="px-8 mb-2 md:mb-3">
                    <div className="font-bold font-serif text-2xl md:text-4xl">
                        {page.title}
                    </div>

                    <div className="mt-1 text-sm md:text-lg md:mt-3">
                        {serializeRichTextToHtml(page.richText)}
                    </div>
                </div>
            </ContentWrapper>

            <Footer />
        </main>
    );
};
