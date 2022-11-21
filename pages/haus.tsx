
import type { StaticImageData } from 'next/image';
import type { ReactElement } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import type { CSSEffect, ScaleOpacityEffect } from 'parallax-controller/dist/types';
import firstFloorImage from 'public/assets/haus/firstFloor.png';
import fullHouseImage from 'public/assets/haus/fullHouse.png';
import fullHouseBlackImage from 'public/assets/haus/fullHouseBlack.png';
import groundFloorImage from 'public/assets/haus/groundFloor.png';
import heartImage from 'public/assets/haus/heart.png';
import kitchenImage from 'public/assets/haus/kitchen.png';
import livingRoomImage from 'public/assets/haus/livingRoom.png';
import secondFloorImage from 'public/assets/haus/secondFloor.png';
import terraceImage from 'public/assets/haus/terrace.png';

interface ParallaxImageProps {
    image: StaticImageData;
    startScroll: number;
    endScroll: number;
    opacity?: ScaleOpacityEffect;
    translateY?: CSSEffect;
    withWhiteBackground?: boolean;
}

const ParallaxImage = ({ endScroll, image, opacity, startScroll, translateY, withWhiteBackground = false }: ParallaxImageProps): ReactElement => {

    const backgroundStartScroll = ((endScroll - startScroll) / 2) + startScroll;

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-1/2 w-full h-screen">
            {withWhiteBackground && (
                <Parallax
                    opacity={opacity}
                    translateY={translateY}
                    className="absolute top-0 right-0 bottom-0 left-0 bg-white"
                    startScroll={backgroundStartScroll}
                    endScroll={endScroll}
                />
            )}

            <Parallax
                opacity={opacity}
                translateY={translateY}
                className="w-full h-full bg-no-repeat bg-contain bg-center"
                startScroll={startScroll}
                endScroll={endScroll}
                style={{ backgroundImage: `url(${image.src})` }}
            />
        </div>
    );
};

const Haus = (): ReactElement => {

    return (
        <ParallaxProvider>
            <div className="flex h-[1200vh] overflow-hidden">
                <ParallaxImage
                    image={heartImage}
                    opacity={[1, 0]}
                    startScroll={400}
                    endScroll={600}
                />

                <ParallaxImage
                    image={groundFloorImage}
                    startScroll={400}
                    endScroll={800}
                />

                <ParallaxImage
                    image={firstFloorImage}
                    translateY={[0, -12]}
                    startScroll={400}
                    endScroll={800}
                />

                <ParallaxImage
                    image={secondFloorImage}
                    translateY={[0, -24]}
                    startScroll={400}
                    endScroll={800}
                />

                <ParallaxImage
                    image={fullHouseImage}
                    opacity={[0, 1]}
                    startScroll={660}
                    endScroll={900}
                    withWhiteBackground={true}
                />

                <ParallaxImage
                    image={fullHouseBlackImage}
                    opacity={[0, 1]}
                    startScroll={1000}
                    endScroll={1100}
                    withWhiteBackground={true}
                />

                <ParallaxImage
                    image={terraceImage}
                    opacity={[0, 1]}
                    startScroll={1300}
                    endScroll={1400}
                    withWhiteBackground={true}
                />

                <ParallaxImage
                    image={kitchenImage}
                    opacity={[0, 1]}
                    startScroll={1600}
                    endScroll={1700}
                    withWhiteBackground={true}
                />

                <ParallaxImage
                    image={livingRoomImage}
                    opacity={[0, 1]}
                    startScroll={1900}
                    endScroll={2000}
                    withWhiteBackground={true}
                />
            </div>
        </ParallaxProvider>
    );
};

export default Haus;
