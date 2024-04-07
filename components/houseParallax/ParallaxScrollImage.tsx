import { useMemo } from 'react';
import Image from 'next/image';
import type { ReactElement } from 'react';
import type { ScrollImage } from '@/lib/houseParallax/getScrollElements';

interface ParallaxScrollImageProps extends ScrollImage {
    scrollY: number;
}

const ParallaxScrollImage = ({
    image,
    display,
    fade,
    scrollY,
}: ParallaxScrollImageProps): ReactElement => {
    const opacity = useMemo(() => {
        if (display !== undefined) {
            if (scrollY >= display.begin && scrollY < display.end) {
                return 1;
            }

            return 0;
        }

        if (fade === undefined) {
            return 0;
        }

        if (scrollY < fade.inBegin || scrollY > fade.outEnd) {
            return 0;
        }

        if (scrollY < fade.inEnd) {
            return (scrollY - fade.inBegin) / (fade.inEnd - fade.inBegin);
        }

        if (scrollY > fade.outBegin) {
            return (scrollY - fade.outEnd) / (fade.outBegin - fade.outEnd);
        }

        return 1;
    }, [display, fade, scrollY]);

    return (
        <Image
            src={image.src}
            style={{
                opacity,
                pointerEvents: opacity === 0 ? 'none' : 'all',
            }}
            className="object-contain"
            fill={true}
            alt="B-Side"
            priority={true}
        />
    );
};

export default ParallaxScrollImage;
