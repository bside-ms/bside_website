import { useCallback } from 'react';
import type { ReactElement, SyntheticEvent } from 'react';
import MobileNavigationItems from '@/components/Layout/Navigation/Mobile/MobileNavigationItems';
import { useAppContext } from '@/components/Layout/Next/AppContext';

const MobileNavigationOverlay = (): ReactElement | null => {

    const { isNavigationOpen, toggleNavigation } = useAppContext();

    const handleSvgClick = useCallback((event: SyntheticEvent<SVGElement>) => {

        // Toggle navigation when user does not click on path aka the heart
        if (!(event.target instanceof SVGPathElement)) {
            toggleNavigation();
        }
    }, [toggleNavigation]);

    return (
        <>
            <nav
                className="fixed lg:hidden w-[360px] h-[833px] right-0 z-40 transition-all"
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
                            <path
                                d="M510.18,233.18,272.039,29.857,0,217.033V640.254L655.117,1139.33Z"
                                transform="translate(0 40.544)"
                            />
                        </g>
                    </g>
                </svg>

                <div
                    className={`tw
                        absolute
                        top-[100px]
                        left-[95px]
                        rounded-full
                        w-16
                        h-16
                        border-black
                        border-4
                        bg-white
                        flex
                        justify-center
                        items-center
                        text-4xl
                        md:cursor-pointer
                        z-50
                    `}
                    onClick={toggleNavigation}
                >
                    ✕
                </div>

                <div
                    className={`tw
                        absolute
                        top-[130px]
                        right-[30px]
                        w-[270px]
                        z-40
                    `}
                >
                    <MobileNavigationItems />
                </div>
            </nav>

            <div
                className={
                    isNavigationOpen
                        ? 'fixed top-0 right-0 bottom-0 left-0 bg-black z-30 opacity-30 transition-opacity'
                        : 'fixed top-0 right-0 bottom-0 left-0 bg-black z-30 opacity-0 pointer-events-none'
                }
                onClick={isNavigationOpen ? toggleNavigation : undefined}
            />
        </>
    );
};

export default MobileNavigationOverlay;
