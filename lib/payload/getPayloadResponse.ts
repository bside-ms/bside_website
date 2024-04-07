const getPayloadResponse = async <T>(path: string, preview: boolean = false): Promise<T> => {
    const headers = new Headers({
        Authorization: preview
            ? `${process.env.PAYLOAD_API_COLLECTION} API-Key ${process.env.PAYLOAD_API_KEY}`
            : `${process.env.PAYLOAD_API_COLLECTION} API-Key none`,
    });

    const fetchResponse = await fetch(
        `${process.env.PAYLOAD_URL}${path}${preview ? '&draft=true' : ''}`,
        {
            headers,
        },
    );

    if (!fetchResponse.ok) {
        throw new Error();
    }

    return fetchResponse.json() as T;
};

export default getPayloadResponse;
