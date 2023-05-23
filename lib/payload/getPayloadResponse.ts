const getPayloadResponse = async <T>(path: string): Promise<T> => {

    const fetchResponse = await fetch(
        `${process.env.PAYLOAD_URL}${path}`,
        {
            headers: new Headers({
                Authorization: `${process.env.PAYLOAD_API_COLLECTION} API-Key ${process.env.PAYLOAD_API_KEY}`,
            }),
        }
    );

    return fetchResponse.json() as T;
};

export default getPayloadResponse;
