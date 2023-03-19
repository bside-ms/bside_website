import { useCallback, useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { BsArrowDownCircle } from 'react-icons/bs';
import { RxChevronDown } from 'react-icons/rx';
import isEmptyNumber from 'lib/common/helper/isEmptyNumber';
import useIsMounted from 'lib/common/hooks/useIsMounted';

interface Props {
    scrollY: number;
    firstInfoBoxPositions?: number;
}

const ParallaxScrollTeaser = ({ scrollY, firstInfoBoxPositions }: Props): ReactElement | null => {

    const isMounted = useIsMounted();

    const [showTeaser, setShowTeaser] = useState(false);

    useEffect(
        () => setShowTeaser(isMounted && scrollY === 0),
        [isMounted, scrollY]
    );

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
            className="absolute bottom-8 md:top-full left-1/2 -translate-x-1/2 transition-opacity duration-500 delay-500"
            style={{ opacity: showTeaser ? 1 : 0 }}
            onClick={handleClick}
        >
            <div className="bg-black text-white rounded-full flex flex-col leading-none items-center p-2 pb-3">
                <div className="text-2xl mb-1"><BsArrowDownCircle /></div>
                <div className="animate-disappear-1 -mb-1"><RxChevronDown /></div>
                <div className="animate-disappear-2 -mb-1"><RxChevronDown /></div>
                <div className="animate-disappear-3 -mb-1"><RxChevronDown /></div>
            </div>
        </div>
    );
};

export default ParallaxScrollTeaser;
