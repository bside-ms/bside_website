import { useCallback, useEffect, useMemo, useState } from 'react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { ReactElement } from 'react';
import Footer from 'components/common/Footer';
import HeaderBar from 'components/common/HeaderBar';
import Navigation from 'components/navigation/Navigation';
import useIsMounted from 'lib/common/hooks/useIsMounted';
import parallax01Image from 'public/assets/parallax/Parallax_01.png';
import parallax02Image from 'public/assets/parallax/Parallax_02.png';
import parallax061Image from 'public/assets/parallax/Parallax_06_1.png';
import parallax062Image from 'public/assets/parallax/Parallax_06_2.png';
import parallax063Image from 'public/assets/parallax/Parallax_06_3.png';
import parallax064Image from 'public/assets/parallax/Parallax_06_4.png';
import parallax065Image from 'public/assets/parallax/Parallax_06_5.png';
import parallax066Image from 'public/assets/parallax/Parallax_06_6.png';
import parallax067Image from 'public/assets/parallax/Parallax_06_7.png';
import parallax07Image from 'public/assets/parallax/Parallax_07.png';
import parallax08Image from 'public/assets/parallax/Parallax_08.png';
import parallax085Image from 'public/assets/parallax/Parallax_08_5.png';
import parallax10Image from 'public/assets/parallax/Parallax_10.png';
import parallax11Image from 'public/assets/parallax/Parallax_11.png';
import parallax12Image from 'public/assets/parallax/Parallax_12.png';
import parallax13Image from 'public/assets/parallax/Parallax_13.png';
import parallax14Image from 'public/assets/parallax/Parallax_14.png';
import parallax15Image from 'public/assets/parallax/Parallax_15.png';
import parallax16Image from 'public/assets/parallax/Parallax_16.png';
import parallax17Image from 'public/assets/parallax/Parallax_17.png';
import parallax18Image from 'public/assets/parallax/Parallax_18.png';
import parallax19Image from 'public/assets/parallax/Parallax_19.png';
import parallax20Image from 'public/assets/parallax/Parallax_20.png';
import parallax21Image from 'public/assets/parallax/Parallax_21.png';
import parallax22Image from 'public/assets/parallax/Parallax_22.png';
import parallax23Image from 'public/assets/parallax/Parallax_23.png';
import parallax24Image from 'public/assets/parallax/Parallax_24.png';
import parallax25Image from 'public/assets/parallax/Parallax_25.png';

interface ScrollImage {
    image: StaticImageData;
    display?: {
        begin: number;
        end: number;
    };
    fade?: {
        inBegin: number;
        inEnd: number;
        outBegin: number;
        outEnd: number;
    };
}

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

    const lastImage = scrollImages.reduce<ScrollImage | null>(
        (currentLastImage, scrollImage) => {
            if (currentLastImage === null) {
                return scrollImage;
            }

            if (getEndOfImage(scrollImage) > getEndOfImage(currentLastImage)) {
                return scrollImage;
            }

            return currentLastImage;
        },
        null
    );

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

const getScrollImages = (): Array<ScrollImage> => {

    const scrollImages = new Array<ScrollImage>(
        {
            image: parallax02Image,
            fade: {
                inBegin: 0,
                inEnd: 0,
                outBegin: 700,
                outEnd: 1500,
            },
        },
    );

    let currentBegin = 0;

    const addFadingScrollImage = (image: StaticImageData, duration: number, transition = 35): void => {

        const inBegin = currentBegin === 0 ? 0 : currentBegin - transition;
        const inEnd = currentBegin === 0 ? 0 : currentBegin + transition;

        currentBegin = currentBegin + duration;

        const outBegin = currentBegin - transition;
        const outEnd = currentBegin + transition;

        scrollImages.push({
            image,
            fade: {
                inBegin,
                inEnd,
                outBegin,
                outEnd,
            },
        });
    };

    const addDisplayingScrollImage = (image: StaticImageData, duration: number): void => {

        const begin = currentBegin === 0 ? 0 : currentBegin;

        currentBegin = currentBegin + duration;

        const end = currentBegin;

        scrollImages.push({
            image,
            display: {
                begin,
                end,
            },
        });
    };

    addFadingScrollImage(parallax01Image, 1000);

    addFadingScrollImage(parallax061Image, 100);
    addFadingScrollImage(parallax062Image, 100);
    addFadingScrollImage(parallax063Image, 100);
    addFadingScrollImage(parallax064Image, 100);
    addFadingScrollImage(parallax065Image, 100);
    addFadingScrollImage(parallax066Image, 100);
    addFadingScrollImage(parallax067Image, 100);

    addFadingScrollImage(parallax07Image, 500);

    addFadingScrollImage(parallax08Image, 400, 50);

    addFadingScrollImage(parallax07Image, 300);
    addFadingScrollImage(parallax085Image, 400, 50);

    currentBegin = currentBegin - 50;

    addDisplayingScrollImage(parallax10Image, 400);
    addDisplayingScrollImage(parallax11Image, 400);
    addDisplayingScrollImage(parallax12Image, 400);
    addDisplayingScrollImage(parallax13Image, 400);
    addDisplayingScrollImage(parallax14Image, 400);
    addDisplayingScrollImage(parallax15Image, 400);
    addDisplayingScrollImage(parallax16Image, 400);
    addDisplayingScrollImage(parallax17Image, 400);
    addDisplayingScrollImage(parallax18Image, 400);
    addDisplayingScrollImage(parallax19Image, 400);
    addDisplayingScrollImage(parallax20Image, 400);
    addDisplayingScrollImage(parallax21Image, 400);
    addDisplayingScrollImage(parallax22Image, 400);
    addDisplayingScrollImage(parallax23Image, 400);
    addDisplayingScrollImage(parallax24Image, 400);
    addDisplayingScrollImage(parallax25Image, 400);

    currentBegin = currentBegin - 50;

    addFadingScrollImage(parallax085Image, 600, 50);

    addFadingScrollImage(parallax07Image, 500);

    scrollImages.push({
        image: parallax02Image,
        fade: {
            inBegin: currentBegin,
            inEnd: currentBegin + 400,
            outBegin: currentBegin + 1200,
            outEnd: currentBegin + 1500,
        },
    });

    addFadingScrollImage(parallax067Image, 100);
    addFadingScrollImage(parallax066Image, 100);
    addFadingScrollImage(parallax065Image, 100);
    addFadingScrollImage(parallax064Image, 100);
    addFadingScrollImage(parallax063Image, 100);
    addFadingScrollImage(parallax062Image, 100);
    addFadingScrollImage(parallax061Image, 100);

    return scrollImages;
};

interface ScrollImageElementProps {
    image: StaticImageData;
    fade?: {
        inBegin: number;
        inEnd: number;
        outBegin: number;
        outEnd: number;
    };
    display?: {
        begin: number;
        end: number;
    };
    scrollY: number;
}

const ScrollImageElement = ({ image, display, fade, scrollY }: ScrollImageElementProps): ReactElement => {

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
            return (scrollY - fade.inBegin) / fade.inEnd - fade.inBegin;
        }

        if (scrollY > fade.outBegin) {
            return (scrollY - fade.outEnd) / (fade.outBegin - fade.outEnd);
        }

        return 1;
    }, [display, fade, scrollY]);

    return (
        <Image
            src={image.src}
            style={{ opacity, objectFit: 'contain' }}
            fill={true}
            alt="B-Side"
        />
    );
};

export default (): ReactElement | null => {

    const [scrollY, setScrollY] = useState(0);

    const handleScroll = useCallback(() => setScrollY(window.scrollY), []);

    const isMounted = useIsMounted();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollImages = getScrollImages();

    const endScroll = useEndScroll(isMounted, scrollImages);

    return (
        <>
            <Navigation />

            <HeaderBar />

            <div className="flex overflow-hidden" style={{ height: endScroll }}>
                <div className="fixed top-16 left-0">
                    {scrollY}
                </div>

                <div className="fixed top-1/2 left-1/2 h-screen w-screen md:h-3/4 d:w-3/4 -translate-y-1/2 -translate-x-1/2">
                    {scrollImages.map(({ image, fade, display }) => (
                        <ScrollImageElement
                            key={`${image.src}${fade?.inBegin ?? ''}${display?.begin ?? ''}`}
                            image={image}
                            display={display}
                            fade={fade}
                            scrollY={scrollY}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};
