import Image from 'next/image';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import { Separator } from '@/components/ui/separator';
import formatDate from '@/lib/common/helper/formatDate';
import { createNewsSlug, getCircleOrOrganisationName, getNewsCategory } from '@/lib/news/news';
import type { Media, News } from '@/types/payload/payload-types';
import { headlineClass } from '@blocks/headlineBlock/HeadlineTag';

interface Props {
    news: Array<News>;
}

const NewsPagination = ({ news }: Props): ReactElement | null => {
    const { locale } = useRouter();
    const { isMd, isLg } = useBreakpointContext();

    return (
        <>
            {news.map((item, index) => {
                const media = item.newsImage as Media;

                return (
                    <div key={item.id} className="mt-4 lg:mt-0">
                        <a className="lg:flex lg:gap-4" href={`/news/${createNewsSlug(item)}`}>
                            <div className="py-4 md:pr-4 lg:grow">
                                <small className="mb-1 block text-base font-normal italic leading-none tracking-normal md:text-base">
                                    <strong>
                                        <i>{getNewsCategory(item.newsCategory, locale!)}</i>
                                    </strong>{' '}
                                    - {formatDate(item.newsDate, 'dd.MM.yyyy')} -{' '}
                                    {getCircleOrOrganisationName(item.newsAuthor)}
                                </small>

                                <div className="max-w-full">
                                    <div className={headlineClass.h3}>{item.title}</div>
                                </div>

                                <div className="lg:float-left lg:hidden lg:pr-8">
                                    <Image
                                        src={media.url!}
                                        alt=""
                                        width={300}
                                        height={300}
                                        className="mx-auto py-4"
                                    />
                                </div>

                                <p className="py-1 sm:text-lg">{item.excerpt}</p>

                                <p className="flex items-center gap-2 underline underline-offset-4 hover:text-orange-500 sm:text-lg">
                                    {locale !== 'en' ? 'Weiterlesen' : 'Read more'}
                                </p>
                            </div>

                            <div className="hidden drop-shadow-lg lg:block lg:flex-none">
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
            })}
        </>
    );
};

export default NewsPagination;
