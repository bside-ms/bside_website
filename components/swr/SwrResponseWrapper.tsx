import type { PaginatedDocs } from 'payload/dist/mongoose/types';
import type { ReactElement } from 'react';
import type { SWRResponse } from 'swr/dist/types';

interface Props<T> {
    response: SWRResponse<PaginatedDocs<T>, Error>;
    children: (response: PaginatedDocs['docs']) => ReactElement;
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
const SwrResponseWrapper = <T, >({ response: { data, error }, children }: Props<T>): ReactElement => {

    if (error !== undefined) {
        return (
            <div>
                <div>Es ist ein Fehler aufgetreten</div>
                {error.message}
            </div>
        );
    }

    if (data === undefined) {
        return (
            <div>Wird geladen...</div>
        );
    }

    return children(data.docs);
};

export default SwrResponseWrapper;
