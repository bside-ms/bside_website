const createPayloadEntry = async (path: string, body: unknown): Promise<void> => {
    /* eslint-disable quote-props */
    const headers = new Headers({
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    });
    /* eslint-enable quote-props */

    await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
};

export default createPayloadEntry;
