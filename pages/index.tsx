import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import FrontPageHero from '@/components/frontPage/FrontPageHero';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import NewsTeaser from '@/components/news/NewsTeaser';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { News, Page, StartPage } from '@/types/payload/payload-types';
import Headline from '@blocks/headlineBlock/Headline';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    page: Page;
    homePage: StartPage;
    news: Array<News>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>(
        `/api/pages/?where[slug][equals]=home&locale=${locale}`,
    );
    const page = pagesResponse.docs[0];

    const indexResponse = await getPayloadResponse<StartPage>(
        `/api/globals/start-page/?locale=${locale}`,
    );

    if (page === undefined) {
        return { notFound: true };
    }

    const newsResponse = await getPayloadResponse<PaginatedDocs<News>>(
        `/api/news/?limit=6&depth=1&locale=${locale}&sort=-newsDate`,
    );

    return {
        revalidate: 60,
        props: {
            page,
            homePage: indexResponse,
            locale,
            news: newsResponse.docs,
        },
    };
};

export default ({ page, homePage, news }: Props): ReactElement => {
    const { locale } = useRouter();

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <NextHead />

            <HeaderBar />

            <main id="content">
                <FrontPageHero
                    title={homePage.title}
                    textBody={homePage.textBody}
                    buttonText={homePage.buttonText}
                />

                <div className="py-2 md:py-4" />

                <ReusableBlockLayout
                    layout={page.layout}
                    eventsOnPage={{
                        filter: 'Home',
                        perPage: 5,
                    }}
                />

                <ContentWrapper>
                    <Headline
                        title={locale === 'de' ? 'Aktuelles' : 'News'}
                        level="h2"
                        textClass="pb-4 lg:pb-8 pt-4"
                    />
                    <NewsTeaser news={news} />
                </ContentWrapper>
            </main>

            <Footer />
        </div>
    );
};
