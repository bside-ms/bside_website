import type { GetStaticPaths, GetStaticProps } from 'next';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import NewsOverview from '@/components/news/NewsOverview';
import NewsPagination from '@/components/news/NewsPagination';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { getPublicClientUrl, processSlug } from '@/lib/common/url';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import { PER_PAGE } from '@/pages/news';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { News } from '@/types/payload/payload-types';
import Headline from '@blocks/headlineBlock/Headline';

interface Props {
    paginatedNews: PaginatedDocs<News>;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = await getPayloadResponse<PaginatedDocs<News>>('/api/news/?limit=9999');
    const totalPages = pages.totalPages;

    const paths = Array.from({ length: totalPages }, (_, i) => ({
        params: { page: (i + 1).toString() },
    }));

    return {
        fallback: 'blocking',
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale, params }) => {
    const page = processSlug(params?.page);
    if (isEmptyString(page) || locale === undefined) {
        return { notFound: true };
    }

    const news = await getPayloadResponse<PaginatedDocs<News>>(
        `/api/news/?limit=${PER_PAGE}&page=${page}&depth=1&locale=${locale}&sort=-newsDate`,
    );

    return {
        revalidate: 60,
        props: {
            locale,
            paginatedNews: news,
        },
    };
};

export default ({ paginatedNews }: Props): ReactElement => {
    const locale = useLocale();

    const news = paginatedNews.docs;
    const hasPagination = paginatedNews.totalPages > 1;

    const path = paginatedNews.page !== 1 ? `/news/pages/${paginatedNews.page}` : '/news';

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <NextHead
                title="B-Side - Aktuelles"
                description="Was passiert gerade in der B-Side?"
                url={`${getPublicClientUrl(locale)}${path}`}
            />

            <HeaderBar />

            <main id="content">
                <ContentWrapper>
                    <Headline title="Aktuelles" level="h1" />
                </ContentWrapper>

                <ContentWrapper>
                    <NewsOverview news={news} />
                </ContentWrapper>

                {hasPagination && (
                    <ContentWrapper>
                        <NewsPagination paginatedNews={paginatedNews} />
                    </ContentWrapper>
                )}
            </main>

            <Footer />
        </div>
    );
};
