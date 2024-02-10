import type { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import formatDate from '@/lib/common/helper/formatDate';
import { getPublicClientUrl } from '@/lib/common/url';
import { getCircleOrOrganisationName, getNewsCategory } from '@/lib/news/news';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Media, News } from '@/types/payload/payload-types';
import Headline from '@blocks/headlineBlock/Headline';
import HeadlineBlock from '@blocks/headlineBlock/HeadlineBlock';

interface Props {
    news: Array<News>;
}

// ToDo: Add pagination.
const PER_PAGE: number = 10;

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {

    const paginatedNews = await getPayloadResponse<PaginatedDocs<News>>(`/api/news/?limit=${PER_PAGE}&depth=1&locale=${locale}`);
    const news = paginatedNews.docs;

    return {
        revalidate: 60,
        props: {
            locale,
            news,
        },
    };

};

export default ({ news }: Props): ReactElement => {
    const { locale } = useRouter();
    
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NextHead
                title="B-Side - Aktuelles"
                description="Was passiert gerade in der B-Side?"
                url={`${getPublicClientUrl(locale)}/news`}
            />

            <HeaderBar />
            <ContentDivider />

            <main id="content">

                <HeadlineBlock
                    title="Aktuelles"
                    level="h1"
                />

                <ContentWrapper>
                    <p className="pt-4 sm:text-xl">
                        {
                            // ToDo: Filter einfügen.
                        }
                    </p>
                </ContentWrapper>

                <ContentWrapper>

                    {
                        news.map((item, index) => {
                            const media = item.newsImage as Media;

                            return (
                                <div key={item.id}>

                                    <div className="flex gap-4 h-[300px] overflow-hidden">
                                        <div className="flex-none">
                                            <Image
                                                src={media.url!}
                                                alt=""
                                                width={300}
                                                height={300}
                                                className="p-4"
                                            />
                                        </div>

                                        <div className="grow p-4">
                                            <Headline
                                                title={item.title}
                                                level="h1"
                                                teaser={`<strong><i>${getNewsCategory(item.newsCategory, locale!)}</i></strong> - ${formatDate(item.newsDate, 'dd.MM.yyyy')} - ${getCircleOrOrganisationName(item.newsAuthor)}`}
                                            />
                                            <p className="py-1 sm:text-lg h-[150px] overflow-hidden">
                                                {item.excerpt}
                                            </p>
                                            <Link href={`/news/${item.id}`} className="sm:text-lg underline underline-offset-4 flex items-center gap-2 hover:text-orange-500">
                                                Weiterlesen...
                                            </Link>
                                        </div>
                                    </div>

                                    {
                                        // Display a horizontal line after each news item, except for the last one.
                                        index < news.length - 1 && <hr className="my-4 w-full mx-auto border-1 border-gray-800" />
                                    }
                                </div>
                            );
                        })
                    }

                </ContentWrapper>

            </main>

            <Footer />
        </div>
    );
};
