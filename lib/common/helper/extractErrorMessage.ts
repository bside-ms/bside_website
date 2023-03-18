const extractErrorMessage = (error: unknown): string => {

    if (error instanceof Error) {
        return `(${error.name}) ${error.message}`;
    }

    return typeof error === 'object' && error !== null && 'toString' in error
        ? error.toString()
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        : `${error}`;
};

export default extractErrorMessage;
