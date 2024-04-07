import { useState } from 'react';
import type { ScrollImage } from '@/lib/houseParallax/getScrollElements';

const useEndScroll = (isMounted: boolean, scrollImages: Array<ScrollImage>): number => {
    const fallbackValue = 10000;

    const [screenHeight, setScreenHeight] = useState(0);

    if (!isMounted) {
        return fallbackValue;
    }

    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return fallbackValue;
    }

    if (!('ResizeObserver' in window)) {
        return fallbackValue;
    }

    const observer = new ResizeObserver(() => {
        const isPortrait = window.matchMedia('(orientation: portrait)').matches;

        if (isPortrait) {
            setScreenHeight(screen.availHeight);
            return;
        }

        // iOS doesn't switch width and height on orientation
        // change, so we have to find out what's lower.
        setScreenHeight(Math.min(screen.availHeight, screen.availWidth));
    });

    observer.observe(document.body);

    const getEndOfImage = (image: ScrollImage): number => {
        if (image.fade !== undefined) {
            return image.fade.outEnd;
        }

        if (image.display !== undefined) {
            return image.display.end;
        }

        return 0;
    };

    const lastImage = scrollImages.reduce<ScrollImage | null>((currentLastImage, scrollImage) => {
        if (currentLastImage === null) {
            return scrollImage;
        }

        if (getEndOfImage(scrollImage) > getEndOfImage(currentLastImage)) {
            return scrollImage;
        }

        return currentLastImage;
    }, null);

    if (lastImage === null) {
        return fallbackValue;
    }

    if (lastImage.display !== undefined) {
        return lastImage.display.end + screenHeight;
    }

    if (lastImage.fade !== undefined) {
        return lastImage.fade.outEnd + screenHeight;
    }

    return fallbackValue;
};

export default useEndScroll;
