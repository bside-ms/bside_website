import { useMemo } from 'react';
import type { ReactElement } from 'react';
import isNotEmptyString from 'lib/common/helper/isNotEmptyString';
import type { ScrollInfoBox } from 'lib/houseParallax/getScrollElements';

interface ParallaxScrollInfoBoxProps extends ScrollInfoBox {
    scrollY: number;
}

const slideDuration = 300;
const fadeDuration = slideDuration;

const ParallaxScrollInfoBox = ({ title, text, display, scrollY }: ParallaxScrollInfoBoxProps): ReactElement => {

    const [opacity, leftPosition] = useMemo((): [number, string] => {

        const slideInEnd = display.begin + slideDuration;
        const fadeInBegin = display.begin;
        const fadeInEnd = display.begin + fadeDuration;
        const slideOutBegin = display.end - slideDuration;
        const fadeOutBegin = display.end - fadeDuration;
        const fadeOutEnd = display.end;

        if (scrollY < display.begin) {
            return [0, '0%'];
        }

        if (scrollY < slideInEnd) {
            return [
                scrollY >= fadeInEnd ? 1 : (scrollY - fadeInBegin) / (slideInEnd - fadeInBegin),
                `${((scrollY - display.begin) / (slideInEnd - display.begin) * 100) / 2}%`,
            ];
        }

        if (scrollY >= display.begin && scrollY <= slideOutBegin) {
            return [1, '50%'];
        }

        if (scrollY <= display.end) {
            return [
                scrollY <= fadeOutBegin ? 1 : (1 - (scrollY - fadeOutBegin) / (fadeOutEnd - fadeOutBegin)),
                `${(((scrollY - slideOutBegin) / (display.end - slideOutBegin) * 100) / 2) + 50}%`,
            ];
        }

        return [0, '100%'];

    }, [display, scrollY]);

    return (
        <div
            style={{ opacity, left: leftPosition }}
            className="absolute bottom-12 md:top-full -translate-x-1/2 w-2/3 md:w-[40rem]"
        >
            <div className="flex flex-col bg-black text-white p-6">
                {isNotEmptyString(title) && (
                    <div className="font-bold font-serif mb-3 text-lg md:text-xl">
                        {title}
                    </div>
                )}
                <div className="md:text-lg">
                    {text}
                </div>
            </div>
        </div>
    );
};

export default ParallaxScrollInfoBox;
