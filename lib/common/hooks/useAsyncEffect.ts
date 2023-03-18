import { useEffect } from 'react';
import type { DependencyList } from 'react';

/**
 * It's the same as useEffect, it just makes it easier and more explicit
 * to use a callback which returns a promise.
 */
const useAsyncEffect = (asyncCallback: () => MaybePromise<void>, dependencies: DependencyList = []): void => {

    useEffect(
        () => void (async (): Promise<void> => asyncCallback())(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [...dependencies]
    );
};

export default useAsyncEffect;
