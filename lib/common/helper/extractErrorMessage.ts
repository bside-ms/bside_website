const extractErrorMessage = (error: unknown): string => {

    if (error instanceof Error) {
        return `(${error.name}) ${error.message}`;
    }

    return typeof error === 'object' && error !== null && 'toString' in error
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        ? error.toString()
        : `${JSON.stringify(error)}`;
};

export default extractErrorMessage;
