import type { GetStaticProps } from 'next';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import NewsOverview from '@/components/news/NewsOverview';
import NewsPagination from '@/components/news/NewsPagination';
import { getPublicClientUrl } from '@/lib/common/url';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { News } from '@/types/payload/payload-types';
import HeadlineBlock from '@blocks/headlineBlock/HeadlineBlock';

export const PER_PAGE: number = 5;

interface Props {
    paginatedNews: PaginatedDocs<News>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const news = await getPayloadResponse<PaginatedDocs<News>>(
        `/api/news/?limit=${PER_PAGE}&page=1&depth=1&locale=${locale}&sort=-newsDate`,
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

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <NextHead
                title="B-Side - Aktuelles"
                description="Was passiert gerade in der B-Side?"
                url={`${getPublicClientUrl(locale)}/news`}
            />

            <HeaderBar />

            <main id="content">
                <HeadlineBlock title="Aktuelles" level="h1" />

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
