import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import type { ReactElement } from 'react';
import BsideElements from '@/components/bside/BsideElements';
import Footer from '@/components/common/Footer';
import ParallaxScrollImage from '@/components/houseParallax/ParallaxScrollImage';
import ParallaxScrollInfoBox from '@/components/houseParallax/ParallaxScrollInfoBox';
import ParallaxScrollTeaser from '@/components/houseParallax/ParallaxScrollTeaser';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import useIsMounted from '@/lib/common/hooks/useIsMounted';
import getInfoBoxPositions from '@/lib/houseParallax/getInfoBoxPositions';
import getScrollElements, { isScrollImage, isScrollInfoBox } from '@/lib/houseParallax/getScrollElements';
import useEndScroll from '@/lib/houseParallax/useEndScroll';

export default (): ReactElement | null => {

    const [scrollY, setScrollY] = useState(0);

    const handleScrollChange = useCallback(() => setScrollY(window.scrollY), []);

    const isMounted = useIsMounted();

    useEffect(handleScrollChange, [isMounted, handleScrollChange]);

    useEffect(() => {
        window.addEventListener('scroll', handleScrollChange);

        return () => window.removeEventListener('scroll', handleScrollChange);
    }, [handleScrollChange]);

    const scrollElements = getScrollElements();

    const scrollImages = scrollElements.filter(isScrollImage);
    const scrollInfoBoxes = scrollElements.filter(isScrollInfoBox);

    const infoBoxPositions = getInfoBoxPositions(scrollInfoBoxes);

    const endScroll = useEndScroll(isMounted, scrollImages);

    return (
        <>
            <HeaderBar />

            <div className="flex overflow-hidden" style={{ height: endScroll }}>
                <div className="fixed top-[40%] left-1/2 h-screen w-screen md:top-16 md:translate-y-0 md:h-3/4 d:w-3/4 -translate-y-1/2 -translate-x-1/2">
                    {scrollImages.map(({ image, fade, display }) => (
                        <ParallaxScrollImage
                            key={`${image.src}${fade?.inBegin ?? ''}${display?.begin ?? ''}`}
                            image={image}
                            display={display}
                            fade={fade}
                            scrollY={scrollY}
                        />
                    ))}

                    {scrollInfoBoxes.map(({ title, text, display }) => (
                        <ParallaxScrollInfoBox
                            key={`${title ?? ''}${typeof text === 'string' && text}`}
                            title={title}
                            text={text}
                            display={display}
                            scrollY={scrollY}
                            infoBoxPositions={infoBoxPositions}
                        />
                    ))}

                    <ParallaxScrollTeaser
                        scrollY={scrollY}
                        firstInfoBoxPositions={infoBoxPositions[0]}
                    />
                </div>
            </div>

            <div className="z-10 relative">
                <ContentWrapper>
                    <div>
                        <div className="w-full h-32 xs:h-40 md:h-52 relative mt-16 mb-8">
                            <Image
                                src="/assets/haus.png"
                                alt="Eine Grafik des Hauses"
                                fill={true}
                                className="object-contain"
                                priority={true}
                            />
                        </div>

                        <div className="font-serif text-lg md:text-xl text-center">
                            Die B-Side ist ein Haus,<br />
                            ein Kollektiv, eine Idee.
                        </div>
                        <div className="md:text-lg text-center">
                            Erfahre hier alles was du wissen willst.
                        </div>
                    </div>

                    <div className="mt-6">
                        <BsideElements />
                    </div>
                </ContentWrapper>

                <Footer />
            </div>
        </>
    );
};
