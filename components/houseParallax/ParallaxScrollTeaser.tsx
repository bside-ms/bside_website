import { useCallback, useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { BsArrowDownCircle } from 'react-icons/bs';
import { RxChevronDown } from 'react-icons/rx';
import isEmptyNumber from '@/lib/common/helper/isEmptyNumber';
import useIsMounted from '@/lib/common/hooks/useIsMounted';

interface Props {
    scrollY: number;
    firstInfoBoxPositions?: number;
}

const ParallaxScrollTeaser = ({ scrollY, firstInfoBoxPositions }: Props): ReactElement | null => {
    const isMounted = useIsMounted();

    const [showTeaser, setShowTeaser] = useState(false);

    useEffect(() => setShowTeaser(isMounted && scrollY === 0), [isMounted, scrollY]);

    const handleClick = useCallback(() => {
        if (isEmptyNumber(firstInfoBoxPositions)) {
            return;
        }

        window.scrollTo({
            top: firstInfoBoxPositions,
            behavior: 'smooth',
        });
    }, [firstInfoBoxPositions]);

    return (
        <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer transition-opacity delay-500 duration-500 md:top-full"
            style={{ opacity: showTeaser ? 1 : 0 }}
            onClick={handleClick}
        >
            <div className="flex flex-col items-center rounded-full bg-black p-2 pb-3 leading-none text-white">
                <div className="mb-1 text-2xl">
                    <BsArrowDownCircle />
                </div>
                <div className="-mb-1 animate-disappear-1">
                    <RxChevronDown />
                </div>
                <div className="-mb-1 animate-disappear-2">
                    <RxChevronDown />
                </div>
                <div className="-mb-1 animate-disappear-3">
                    <RxChevronDown />
                </div>
            </div>
        </div>
    );
};

export default ParallaxScrollTeaser;
