import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import HeaderBanner from '@/components/layout/header/HeaderBanner';
import MobileNavigationOverlay from '@/components/layout/navigation/mobile/MobileNavigationOverlay';
import { useAppContext } from '@/components/layout/next/AppContext';
import BurgerHeart from '@/components/svg/BurgerHeart';
import Heart from '@/components/svg/Heart';

const HeaderBarMobile = (): ReactElement => {
    const { pathname, push } = useRouter();
    const handleClickOnHeart = useCallback(
        () => (pathname === '/' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : push('/')),
        [pathname, push],
    );

    const { toggleNavigation } = useAppContext();

    return (
        <header className="sticky inset-x-0 top-0 z-20">
            <HeaderBanner />

            <div className="relative">
                <div className="absolute left-0 top-0 border-[50px] border-transparent border-l-white border-t-white" />
                <div className="absolute right-0 top-0 border-[50px] border-transparent border-r-white border-t-white" />

                <div className="flex justify-between p-4">
                    <div className="z-20 w-6" onClick={handleClickOnHeart}>
                        <Heart />
                    </div>

                    <div className="z-20 w-6" onClick={toggleNavigation}>
                        <BurgerHeart />
                    </div>
                </div>
            </div>

            <MobileNavigationOverlay />
        </header>
    );
};

export default HeaderBarMobile;
