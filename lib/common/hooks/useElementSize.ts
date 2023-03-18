import { useState } from 'react';
import { throttle } from 'lodash';
import type { RefObject } from 'react';
import useAsyncEffectOnMount from 'lib/common/hooks/useAsyncEffectOnMount';

interface ElementSize {
    width: number;
    height: number;
}

const throttleDelay = 300;

const useElementSize = (refElement: RefObject<HTMLDivElement>, initialSize = { width: 0, height: 0 }): ElementSize => {

    const [elementSize, setElementSize] = useState<ElementSize>(initialSize);

    const throttledElementSizeUpdate = throttle(
        (size: ElementSize) => setElementSize(size),
        throttleDelay
    );

    useAsyncEffectOnMount((): (() => void) => {

        const observer = new ResizeObserver(([resizeObserverEntry]) => {
            throttledElementSizeUpdate(resizeObserverEntry?.contentRect ?? { width: 0, height: 0 });
        });

        if (refElement.current !== null) {
            observer.observe(refElement.current);
        }

        return () => {

            if (refElement.current !== null) {
                observer.unobserve(refElement.current);
            }

            observer.disconnect();
        };
    });

    return elementSize;
};

export default useElementSize;
