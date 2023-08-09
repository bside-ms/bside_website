import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import MobileNavigationOverlay from '@/components/layout/navigation/mobile/MobileNavigationOverlay';
import { useAppContext } from '@/components/layout/next/AppContext';
import BurgerHeart from '@/components/svg/BurgerHeart';
import Heart from '@/components/svg/Heart';

const HeaderBarMobile = (): ReactElement => {

    const { pathname, push } = useRouter();
    const handleClickOnHeart = useCallback(
        () => pathname === '/'
            ? window.scrollTo({ top: 0, behavior: 'smooth' })
            : push('/'),
        [pathname, push]
    );

    const { toggleNavigation } = useAppContext();

    return (
        <header className="fixed top-0 left-0 right-0 z-20">
            <div className="flex justify-between p-4">
                <div className="absolute top-0 left-0 border-[50px] border-transparent border-t-white border-l-white" />
                <div className="absolute top-0 right-0 border-[50px] border-transparent border-t-white border-r-white" />

                <div
                    className="w-6 z-20"
                    onClick={handleClickOnHeart}
                >
                    <Heart />
                </div>

                <div className="w-6 z-20" onClick={toggleNavigation}>
                    <BurgerHeart />
                </div>
            </div>

            <MobileNavigationOverlay />
        </header>
    );
};

export default HeaderBarMobile;
