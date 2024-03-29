import { useCallback } from 'react';
import type { ReactElement } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import isEmptyNumber from '@/lib/common/helper/isEmptyNumber';
import isNotEmptyNumber from '@/lib/common/helper/isNotEmptyNumber';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import { getInfoBoxPosition } from '@/lib/houseParallax/getInfoBoxPositions';
import type { ScrollInfoBox } from '@/lib/houseParallax/getScrollElements';

interface ParallaxScrollInfoBoxProps extends ScrollInfoBox {
    scrollY: number;
    infoBoxPositions: Array<number>;
}

const getOpacityAndLeftPosition = (display: ScrollInfoBox['display'], scrollY: number): [number, string] => {

    if (scrollY < display.begin) {
        return [0, '0%'];
    }

    if (scrollY >= display.begin && scrollY <= display.end) {
        return [1, '50%'];
    }

    return [0, '100%'];
};

const getNeighbouringInfoBoxPositions = (
    scrollInfoBoxDisplay: ScrollInfoBox['display'],
    infoBoxPositions: Array<number>
): [number | null, number | null] => {

    const infoBoxPosition = getInfoBoxPosition(scrollInfoBoxDisplay);

    const priorInfoBoxPosition = [...infoBoxPositions]
        .sort((posA, posB) => posA < posB ? 1 : -1)
        .find(pos => pos < infoBoxPosition);

    const nextInfoBoxPosition = infoBoxPositions
        .find(pos => pos > infoBoxPosition);

    return [
        priorInfoBoxPosition ?? null,
        nextInfoBoxPosition ?? null,
    ];
};

const getInfoBoxesPagingInfo = (
    scrollInfoBoxDisplay: ScrollInfoBox['display'],
    infoBoxPositions: Array<number>
): [number, number] => {

    const infoBoxPosition = getInfoBoxPosition(scrollInfoBoxDisplay);

    return [
        infoBoxPositions.indexOf(infoBoxPosition) + 1,
        infoBoxPositions.length,
    ];
};

const ParallaxScrollInfoBox = ({ title, text, display, scrollY, infoBoxPositions }: ParallaxScrollInfoBoxProps): ReactElement => {

    const [opacity, leftPosition] = getOpacityAndLeftPosition(display, scrollY);

    const [priorInfoBoxPosition, nextInfoBoxPosition] = getNeighbouringInfoBoxPositions(display, infoBoxPositions);
    const [page, pageCount] = getInfoBoxesPagingInfo(display, infoBoxPositions);

    const handlePriorClick = useCallback(() => {

        if (isNotEmptyNumber(priorInfoBoxPosition)) {
            window.scrollTo({
                top: priorInfoBoxPosition,
            });
        }
    }, [priorInfoBoxPosition]);

    const handleNextClick = useCallback(() => {

        if (isNotEmptyNumber(nextInfoBoxPosition)) {
            window.scrollTo({
                top: nextInfoBoxPosition,
            });
        }
    }, [nextInfoBoxPosition]);

    return (
        <div
            style={{
                opacity,
                pointerEvents: opacity === 0 ? 'none' : 'all',
                left: leftPosition,
            }}
            className="absolute bottom-0 md:top-[calc(100%-65px)] transition-all duration-150 -translate-x-1/2 w-[90%] md:w-[40rem]"
        >
            <div className="flex flex-col bg-black bg-opacity-80 text-white p-6">
                <div className="flex justify-between flex-wrap md:flex-nowrap mb-3">
                    {isNotEmptyString(title) ? (
                        <div className="font-bold font-serif text-lg md:text-xl md:whitespace-nowrap">
                            {title}
                        </div>
                    ) : (
                        <div>&nbsp;</div>
                    )}

                    <div className="flex w-full gap-1 md:justify-end items-center text-lg leading-none select-none">
                        <a
                            className="md:cursor-pointer md:hover:text-orange-500 py-1 px-1 md:px-2"
                            onClick={handlePriorClick}
                            style={isEmptyNumber(priorInfoBoxPosition) ? { opacity: 0.3, cursor: 'default' } : undefined}
                        >
                            <BsChevronLeft />
                        </a>

                        <div>{page}&nbsp;/&nbsp;{pageCount}</div>

                        <a
                            className="md:cursor-pointer md:hover:text-orange-500 py-1 px-1 md:px-2"
                            onClick={handleNextClick}
                            style={isEmptyNumber(nextInfoBoxPosition) ? { opacity: 0.3, cursor: 'default' } : undefined}
                        >
                            <BsChevronRight />
                        </a>
                    </div>
                </div>

                <div className="md:text-lg">
                    {text}
                </div>
            </div>
        </div>
    );
};

export default ParallaxScrollInfoBox;
