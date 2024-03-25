import type { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { Separator } from '@/components/ui/separator';
import formatDate from '@/lib/common/helper/formatDate';
import { getPublicClientUrl } from '@/lib/common/url';
import { createNewsSlug, getCircleOrOrganisationName, getNewsCategory } from '@/lib/news/news';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Media, News } from '@/types/payload/payload-types';
import HeadlineBlock from '@blocks/headlineBlock/HeadlineBlock';
import { headlineClass } from '@blocks/headlineBlock/HeadlineTag';

interface Props {
    news: Array<News>;
}

const PER_PAGE: number = 20;

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
    const { isMd, isLg } = useBreakpointContext();

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NextHead
                title="B-Side - Aktuelles"
                description="Was passiert gerade in der B-Side?"
                url={`${getPublicClientUrl(locale)}/news`}
            />

            <HeaderBar />

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

                                    <a className="lg:flex lg:gap-4" href={`/news/${createNewsSlug(item)}`}>

                                        <div className="lg:grow py-4 md:p-4">
                                            <small className="block font-normal leading-none tracking-normal italic text-base md:text-base mb-1">
                                                <strong><i>{getNewsCategory(item.newsCategory, locale!)}</i></strong> - {formatDate(item.newsDate, 'dd.MM.yyyy')} - {getCircleOrOrganisationName(item.newsAuthor)}
                                            </small>

                                            <div className="max-w-full">
                                                <div className={headlineClass.h3}>
                                                    {item.title}
                                                </div>
                                            </div>

                                            <div className="lg:hidden md:float-left md:pr-8">
                                                <Image
                                                    src={media.url!}
                                                    alt=""
                                                    width={300}
                                                    height={300}
                                                    className="mx-auto py-4 md:py-4"
                                                />
                                            </div>

                                            <p className="py-1 sm:text-lg">
                                                {item.excerpt}
                                            </p>

                                            <p
                                                className="sm:text-lg underline underline-offset-4 flex items-center gap-2 hover:text-orange-500"
                                            >
                                                {locale !== 'en' ? 'Weiterlesen' : 'Read more'}
                                            </p>
                                        </div>

                                        <div className="hidden lg:block lg:flex-none drop-shadow-lg">
                                            <Image
                                                src={media.url!}
                                                alt=""
                                                width={isMd && !isLg ? 450 : 300}
                                                height={isMd && !isLg ? 450 : 300}
                                                className="mx-auto md:p-4"
                                            />
                                        </div>
                                    </a>

                                    {
                                        // Display a horizontal line after each news item, except for the last one.
                                        index < news.length - 1 && <Separator className="my-4" />
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
