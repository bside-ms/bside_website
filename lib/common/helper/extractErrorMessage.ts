const extractErrorMessage = (error: unknown): string => {

    if (error instanceof Error) {
        return `(${error.name}) ${error.message}`;
    }

    return typeof error === 'object' && error !== null && 'toString' in error
        ? error.toString()
        : `${JSON.stringify(error)}`;
};

export default extractErrorMessage;
