import clsx from 'clsx';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import useLocale from '@/lib/common/hooks/useLocale';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

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
    const locale = useLocale();

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

                <Link href="/quartier/b-side-cafe">
                    <div className="hidden w-full px-4 md:block lg:mx-auto lg:w-[60rem] xl:w-[80rem]">
                        <div
                            className={clsx(
                                'my-4 h-52 w-full bg-cover bg-center lg:w-auto xl:h-72',
                                'lg:rounded-lg',
                                'transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-md',
                            )}
                            style={{ backgroundImage: `url(/assets/tmp/mittagstisch-banner.png)` }}
                        />
                    </div>
                    <div className="mx-auto mb-8 h-auto w-80 outline outline-offset-2 outline-orange-500 transition duration-300 ease-in-out hover:scale-105 md:hidden">
                        <div className="mx-auto size-80">
                            <div
                                id="mobile-cafe-banner"
                                className={clsx('my-4 size-full bg-cover bg-center', 'rounded-lg')}
                                style={{
                                    backgroundImage: `url(/assets/tmp/mittagstisch-square.png)`,
                                }}
                            />
                        </div>
                        <p className="text-center">
                            Mehr Informationen zum Cafe
                            <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                                height={14}
                                className="ml-1 inline"
                            />
                        </p>
                    </div>
                </Link>

                <ReusableBlockLayout
                    layout={page.layout}
                    eventsOnPage={{
                        filter: 'Home',
                        perPage: 5,
                        pagination: true,
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
