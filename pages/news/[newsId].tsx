import type { GetStaticPaths, GetStaticProps } from 'next/types';
import type { ReactElement } from 'react';
import type News from 'types/payload/News';
import type PaginatedDocs from 'types/payload/PaginatedDocs';

interface Props {
    news: News | null;
}

const NewsArticle = ({ news }: Props): ReactElement => {

    return (

        <div>
            <strong>{news?.title}</strong><br />
            {news?.content}
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {

    const fetchResponse = await fetch(
        `${process.env.PAYLOAD_URL}/api/news/`,
        {
            headers: new Headers({
                Authorization: `${process.env.PAYLOAD_API_COLLECTION} API-Key ${process.env.PAYLOAD_API_KEY}`,
            }),
        }
    );

    const newsResponse = await fetchResponse.json() as PaginatedDocs<News>;

    return {
        fallback: true,
        paths: newsResponse.docs.map(news => `/news/${news.id.toString()}`),
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {

    const { newsId } = params as { newsId: string };

    const fetchResponse = await fetch(
        `${process.env.PAYLOAD_URL}/api/news/${newsId}`,
        {
            headers: new Headers({
                Authorization: `${process.env.PAYLOAD_API_COLLECTION} API-Key ${process.env.PAYLOAD_API_KEY}`,
            }),
        }
    );

    const newsResponse = await fetchResponse.json() as News;

    return {
        revalidate: 10,
        props: {
            news: newsResponse,
        },
    };
};

export default NewsArticle;
