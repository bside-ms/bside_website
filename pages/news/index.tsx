import type { GetStaticProps } from 'next/types';
import type { ReactElement } from 'react';
import News from 'types/payload/News';
import type PaginatedDocs from 'types/payload/PaginatedDocs';

interface Props {
    news: Array<News>;
}

const News = ({ news }: Props): ReactElement => {

    return (
        <div>
            {news.map(newsEntry => (
                <div key={newsEntry.id}>
                    <a href={`/news/${newsEntry.id}`}>{newsEntry.title}</a>
                </div>
            ))}
        </div>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {

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
        revalidate: 10,
        props: {
            news: newsResponse.docs,
        },
    };
};

export default News;
