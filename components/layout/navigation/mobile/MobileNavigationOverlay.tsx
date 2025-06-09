import { useCallback } from 'react';
import type { ReactElement, SyntheticEvent } from 'react';
import MobileNavigationItems from '@/components/layout/navigation/mobile/MobileNavigationItems';
import { useAppContext } from '@/components/layout/next/AppContext';

const MobileNavigationOverlay = (): ReactElement | null => {
    const { isNavigationOpen, toggleNavigation } = useAppContext();

    const handleSvgClick = useCallback(
        (event: SyntheticEvent<SVGElement>) => {
            // Toggle navigation when user does not click on path aka the heart
            if (!(event.target instanceof SVGPathElement)) {
                toggleNavigation();
            }
        },
        [toggleNavigation],
    );

    return (
        <>
            <nav
                className="fixed right-0 z-40 h-[833px] w-[360px] transition-all lg:hidden"
                style={isNavigationOpen ? { right: 0 } : { right: '-833px' }}
            >
                <svg
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    width="378"
                    height="875"
                    viewBox="0 0 378 875"
                    onClick={handleSvgClick}
                >
                    <g transform="translate(-36 -21)">
                        <g transform="translate(64 -26.663)">
                            <path d="M510.18,233.18,272.039,29.857,0,217.033V640.254L655.117,1139.33Z" transform="translate(0 40.544)" />
                        </g>
                    </g>
                </svg>

                <div
                    className="absolute left-[95px] top-[100px] z-[60] flex size-16 items-center justify-center rounded-full border-4 border-black bg-white text-4xl md:cursor-pointer"
                    onClick={toggleNavigation}
                >
                    ✕
                </div>

                <div className="absolute right-[30px] top-[130px] z-40 w-[270px]">
                    <MobileNavigationItems />
                </div>
            </nav>

            <div
                className={
                    isNavigationOpen
                        ? 'fixed inset-0 z-30 bg-black opacity-30 transition-opacity'
                        : 'pointer-events-none fixed inset-0 z-30 bg-black opacity-0'
                }
                onClick={isNavigationOpen ? toggleNavigation : undefined}
            />
        </>
    );
};

export default MobileNavigationOverlay;
