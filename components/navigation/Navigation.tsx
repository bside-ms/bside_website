import Image from 'next/image';
import type { ReactElement } from 'react';
import { useAppContext } from 'components/common/AppContext';
import NavigationLinks from 'components/navigation/NavigationLinks';

const Navigation = (): ReactElement | null => {

    const { isNavigationOpen, toggleNavigation } = useAppContext();

    return (
        <>
            <div
                className="fixed w-[360px] h-[833px] right-0 z-40 transition-all"
                style={isNavigationOpen ? { right: 0 } : { right: '-833px' }}
            >
                <Image src="/assets/navigationHeart.svg" fill={true} alt="navigation background" />

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
                        z-50
                    `}
                >
                    <NavigationLinks />
                </div>
            </div>

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

export default Navigation;
