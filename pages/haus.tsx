import { useCallback, useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Footer from 'components/common/Footer';
import HeaderBar from 'components/common/HeaderBar';
import ParallaxScrollImage from 'components/houseParallax/ParallaxScrollImage';
import ParallaxScrollInfoBox from 'components/houseParallax/ParallaxScrollInfoBox';
import Navigation from 'components/navigation/Navigation';
import useIsMounted from 'lib/common/hooks/useIsMounted';
import getScrollElements, { isScrollImage, isScrollInfoBox } from 'lib/houseParallax/getScrollElements';
import useEndScroll from 'lib/houseParallax/useEndScroll';

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

    const endScroll = useEndScroll(isMounted, scrollImages);

    return (
        <>
            <Navigation />

            <HeaderBar />

            <div className="flex overflow-hidden" style={{ height: endScroll }}>
                <div className="fixed top-16 left-0 text-white">
                    {scrollY}
                </div>

                <div className="fixed top-1/2 left-1/2 h-screen w-screen md:h-3/4 d:w-3/4 -translate-y-1/2 -translate-x-1/2">
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
                            key={`${title ?? ''}${text}`}
                            title={title}
                            text={text}
                            display={display}
                            scrollY={scrollY}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};
