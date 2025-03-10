import { useEffect } from 'react';

/**
 * We took the best from useEffectOnMount and useAsyncEffect and created this beauty.
 */
const useAsyncEffectOnMount = (asyncCallback: () => MaybePromise<void | (() => void)>): void => {
    useEffect(() => void (async (): Promise<void | (() => void)> => asyncCallback())(), []);
};

export default useAsyncEffectOnMount;
