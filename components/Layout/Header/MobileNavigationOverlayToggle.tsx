import type { ReactElement } from 'react';
import { useAppContext } from '@/components/Layout/Next/AppContext';
import BurgerHeart from '@/components/svg/BurgerHeart';

const MobileNavigationOverlayToggle = (): ReactElement => {

    const { toggleNavigation } = useAppContext();

    return (
        <>
            <div className="w-6 z-20" onClick={toggleNavigation}>
                <BurgerHeart />
            </div>
            <div className="absolute top-0 right-0 border-[50px] border-white border-l-transparent border-b-transparent" />
        </>
    );
};

export default MobileNavigationOverlayToggle;
