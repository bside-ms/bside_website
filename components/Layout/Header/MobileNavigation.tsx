import type { ReactElement } from 'react';
import { useAppContext } from '@/components/Layout/Next/AppContext';
import BurgerHeart from '@/components/svg/BurgerHeart';

const MobileNavigation = (): ReactElement => {
    const { toggleNavigation } = useAppContext();

    return (
        <>
            <div
                className="md:hidden w-6 md:w-8 md:cursor-pointer md:hover:text-orange-500 z-20"
                onClick={toggleNavigation}
            >
                <BurgerHeart />
            </div>
            <div
                className="md:hidden absolute top-0 right-0 border-[50px] md:border-[60px] border-white border-l-transparent border-b-transparent transition-all duration-200"
            />
        </>
    );
};

export default MobileNavigation;
