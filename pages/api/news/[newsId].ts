import type { NextApiRequest, NextApiResponse } from 'next';
import type News from 'types/payload/News';

const handler = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {

    const { newsId } = request.query as { newsId?: string };

    // TODO: newsId === undefined

    const fetchResponse = await fetch(
        `${process.env.PAYLOAD_URL}/api/news/${newsId}`,
        {
            headers: new Headers({
                Authorization: `${process.env.PAYLOAD_API_COLLECTION} API-Key ${process.env.PAYLOAD_API_KEY}`,
            }),
        }
    );

    const newsResponse = await fetchResponse.json() as News;

    response.status(200).json(newsResponse);
};

export default handler;
