const getPayloadResponse = async <T>(path: string, preview: boolean = false): Promise<T> => {

    const headers = preview
        ? new Headers({
            Authorization: `${process.env.PAYLOAD_API_COLLECTION} API-Key ${process.env.PAYLOAD_API_KEY}`,
        })
        : new Headers({
            Authorization: `${process.env.PAYLOAD_API_COLLECTION} API-Key none`,
        });

    const fetchResponse = await fetch(
        `${process.env.PAYLOAD_URL}${path}${preview ? '&draft=true' : ''}`,
        {
            headers,
        }
    );

    return fetchResponse.json() as T;
};

export default getPayloadResponse;
