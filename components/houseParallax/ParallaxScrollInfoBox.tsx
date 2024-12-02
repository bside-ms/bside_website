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

const getOpacityAndLeftPosition = (
    display: ScrollInfoBox['display'],
    scrollY: number,
): [number, string] => {
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
    infoBoxPositions: Array<number>,
): [number | null, number | null] => {
    const infoBoxPosition = getInfoBoxPosition(scrollInfoBoxDisplay);

    const priorInfoBoxPosition = [...infoBoxPositions]
        .sort((posA, posB) => (posA < posB ? 1 : -1))
        .find((pos) => pos < infoBoxPosition);

    const nextInfoBoxPosition = infoBoxPositions.find((pos) => pos > infoBoxPosition);

    return [priorInfoBoxPosition ?? null, nextInfoBoxPosition ?? null];
};

const getInfoBoxesPagingInfo = (
    scrollInfoBoxDisplay: ScrollInfoBox['display'],
    infoBoxPositions: Array<number>,
): [number, number] => {
    const infoBoxPosition = getInfoBoxPosition(scrollInfoBoxDisplay);

    return [infoBoxPositions.indexOf(infoBoxPosition) + 1, infoBoxPositions.length];
};

const ParallaxScrollInfoBox = ({
    title,
    text,
    display,
    scrollY,
    infoBoxPositions,
}: ParallaxScrollInfoBoxProps): ReactElement => {
    const [opacity, leftPosition] = getOpacityAndLeftPosition(display, scrollY);

    const [priorInfoBoxPosition, nextInfoBoxPosition] = getNeighbouringInfoBoxPositions(
        display,
        infoBoxPositions,
    );
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
            className="absolute bottom-0 w-[90%] -translate-x-1/2 transition-all duration-150 md:top-[calc(100%-65px)] md:w-[40rem]"
        >
            <div className="flex flex-col bg-black/80 p-6 text-white">
                <div className="mb-3 flex flex-wrap justify-between md:flex-nowrap">
                    {isNotEmptyString(title) ? (
                        <div className="font-serif text-lg font-bold md:whitespace-nowrap md:text-xl">
                            {title}
                        </div>
                    ) : (
                        <div>&nbsp;</div>
                    )}

                    <div className="flex w-full select-none items-center gap-1 text-lg leading-none md:justify-end">
                        <a
                            className="p-1 md:cursor-pointer md:px-2 md:hover:text-orange-500"
                            onClick={handlePriorClick}
                            style={
                                isEmptyNumber(priorInfoBoxPosition)
                                    ? { opacity: 0.3, cursor: 'default' }
                                    : undefined
                            }
                        >
                            <BsChevronLeft />
                        </a>

                        <div>
                            {page}&nbsp;/&nbsp;{pageCount}
                        </div>

                        <a
                            className="p-1 md:cursor-pointer md:px-2 md:hover:text-orange-500"
                            onClick={handleNextClick}
                            style={
                                isEmptyNumber(nextInfoBoxPosition)
                                    ? { opacity: 0.3, cursor: 'default' }
                                    : undefined
                            }
                        >
                            <BsChevronRight />
                        </a>
                    </div>
                </div>

                <div className="md:text-lg">{text}</div>
            </div>
        </div>
    );
};

export default ParallaxScrollInfoBox;
