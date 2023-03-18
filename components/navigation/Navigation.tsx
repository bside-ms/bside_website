import type { ReactElement } from 'react';
import { useAppContext } from 'components/common/AppContext';
import NavigationLinks from 'components/navigation/NavigationLinks';
import Heart from 'components/svg/Heart';

const Navigation = (): ReactElement | null => {

    const { isNavigationOpen, toggleNavigation } = useAppContext();

    return (
        <>
            <div
                className={
                    isNavigationOpen
                        ? 'fixed w-[1000px] left-[calc(100%-320px)] top-1/2 -translate-y-1/2 transition-all z-40'
                        : 'fixed w-[1000px] left-[100%] top-1/2 -translate-y-1/2 transition-all z-40'
                }
            >
                <Heart />

                <div
                    className={`tw
                        absolute
                        top-[150px]
                        left-[50px]
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
                    `}
                    onClick={toggleNavigation}
                >
                    ✕
                </div>

                <div
                    className={`tw
                        absolute
                        top-[230px]
                        left-[50px]
                        w-[230px]
                        
                        
                        
                        
                        
                        
                        
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
