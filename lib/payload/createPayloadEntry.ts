const createPayloadEntry = async (path: string, body: unknown): Promise<void> => {

    const headers = new Headers({
        'Authorization': `${process.env.PAYLOAD_API_COLLECTION} API-Key ${process.env.PAYLOAD_API_KEY}`,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    });

    await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}${path}`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }
    );
};

export default createPayloadEntry;
