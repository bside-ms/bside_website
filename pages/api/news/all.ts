import type { NextApiRequest, NextApiResponse } from 'next';
import type News from 'types/payload/News';
import type PaginatedDocs from 'types/payload/PaginatedDocs';

const handler = async (_request: NextApiRequest, response: NextApiResponse): Promise<void> => {

    const fetchResponse = await fetch(
        `${process.env.PAYLOAD_URL}/api/news/`,
        {
            headers: new Headers({
                Authorization: `${process.env.PAYLOAD_API_COLLECTION} API-Key ${process.env.PAYLOAD_API_KEY}`,
            }),
        }
    );

    const newsResponse = await fetchResponse.json() as PaginatedDocs<News>;

    response.status(200).json(newsResponse);
};

export default handler;
