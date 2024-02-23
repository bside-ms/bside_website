import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import formatDate from '@/lib/common/helper/formatDate';
import { getPublicClientUrl } from '@/lib/common/url';
import { getCircleOrOrganisationName, getNewsCategory } from '@/lib/news/news';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Media, News } from '@/types/payload/payload-types';
import { headlineClass } from '@blocks/headlineBlock/HeadlineTag';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    news: News;
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {

    const pages = await getPayloadResponse<PaginatedDocs<News>>('/api/news/?limit=9999');

    const paths = pages.docs.map((news) => locales!.map((locale) => ({
        params: {
            slug: news.id,
        },
        locale,
    }))).flat();

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

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale }) => {

    if (params?.slug === undefined) {
        return { notFound: true };
    }

    const news = await getPayloadResponse<News>(`/api/news/${getSlug(params.slug)}?depth=1&locale=${locale}`);

    return {
        revalidate: 60,
        props: {
            news,
            locale,
        },
    };
};

export default ({ news: data }: Props): ReactElement => {
    const { locale } = useRouter();
    const media = data.newsImage as Media;

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NextHead
                // ToDo: Hier anpassen.
                title={`${data.title} | B-Side Münster`}
                description="Selbstorganisierter und offener Ort der Möglichkeiten am Münsteraner Hafen"
                url={`${getPublicClientUrl(locale)}/news/${data.slug}`}
            />
            <HeaderBar />

            <main id="content">
                <ContentWrapper>

                    <>
                        <small className="block font-normal leading-none tracking-normal italic text-base md:text-base mb-1">
                            <strong><i>{getNewsCategory(data.newsCategory, locale!)}</i></strong> - {formatDate(data.newsDate, 'dd.MM.yyyy')} - {getCircleOrOrganisationName(data.newsAuthor)}
                        </small>

                        <div className="max-w-full">
                            <div className={headlineClass.h4}>
                                {data.title}
                            </div>
                        </div>
                    </>
                    <div className="float-right p-4">
                        <Image
                            src={media.url!}
                            alt=""
                            width={400}
                            height={400}
                            className="py-4 lg:p-4"
                        />
                    </div>
                </ContentWrapper>
                
                <ReusableBlockLayout
                    layout={data.layout}
                />

                <ContentWrapper>
                    <Link href="/news" className="mt-4 underline underline-offset-4 flex items-center gap-2 hover:text-orange-500">
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} height={16} className="inline" /> {locale === 'de' ? 'Zurück zur Übersicht' : 'Back to overview'}
                    </Link>
                </ContentWrapper>
            </main>

            <Footer />
        </div>
    );
};
