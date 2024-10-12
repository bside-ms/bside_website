import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createNewsSlug } from '@/lib/news/news';
import type { Media, News } from '@/types/payload/payload-types';

interface Props {
    news: Array<News>;
}

const decorations = [
    'decoration-orange-500',
    'decoration-sky-500',
    'decoration-pink-500',
    'decoration-indigo-500',
];

const NewsTeaser = ({ news }: Props): ReactElement | null => {
    const { locale } = useRouter();

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((newsItem, index) => {
                const media = newsItem.newsImage as Media;

                return (
                    <Link
                        href={`/news/${createNewsSlug(newsItem)}`}
                        className="hover:group group text-lg"
                        key={newsItem.id}
                    >
                        <Card className="flex h-full flex-col">
                            <CardHeader className="">
                                <div className="mx-auto overflow-hidden rounded-md">
                                    <Image
                                        src={media.url!}
                                        alt={media.alt}
                                        className="aspect-[3/4] size-auto object-cover transition-all group-hover:scale-105"
                                        width={300}
                                        height={300}
                                    />
                                </div>
                                <CardTitle
                                    className={`${decorations[index % 4]} pt-4 leading-normal underline underline-offset-4`}
                                >
                                    {newsItem.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grow">
                                <p className="line-clamp-6 leading-snug tracking-normal">
                                    {newsItem.excerpt}
                                </p>
                            </CardContent>
                            <CardFooter className="underline decoration-orange-500 underline-offset-4 group-hover:text-orange-500">
                                {locale === 'de' ? 'Mehr lesen' : 'Read more'}
                            </CardFooter>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
};

export default NewsTeaser;
