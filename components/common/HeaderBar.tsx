import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import type { MainMenu } from '../../types/payload/payload-types';
import HeaderMenuItems from '../navigation/HeaderMenuItems';
import { useAppContext } from 'components/common/AppContext';
import BurgerHeart from 'components/svg/BurgerHeart';
import Heart from 'components/svg/Heart';

interface Props {
    onlyWithBurgerMenu?: boolean;
    onlyHeader?: boolean;
    mainMenu?: MainMenu;
}

const HeaderBar = ({ onlyWithBurgerMenu = false, onlyHeader = false, mainMenu = undefined }: Props): ReactElement => {

    const { toggleNavigation } = useAppContext();

    const { pathname, push } = useRouter();

    const handleClickOnHeart = useCallback(
        () => pathname === '/'
            ? window.scrollTo({ top: 0, behavior: 'smooth' })
            : push('/'),
        [pathname, push]
    );

    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 z-10"
            >
                <div className="lg:w-[60rem] lg:mx-auto">
                    <div>
                        <div className="p-4 flex justify-between relative">
                            <div
                                className="absolute top-0 left-0 border-[48px] md:border-[58px] border-transparent transition-all duration-200"
                                style={onlyWithBurgerMenu ? undefined : { borderTopColor: 'white', borderLeftColor: 'white' }}
                            />

                            <div
                                className="w-6 md:w-8 md:cursor-pointer md:hover:text-orange-500 transition-opacity duration-200 z-20"
                                style={onlyWithBurgerMenu ? { opacity: 0 } : { opacity: '100%' }}
                                onClick={handleClickOnHeart}
                            >
                                <Heart />
                            </div>

                            <div
                                className="hidden lg:block text-center justify-center transition-none"
                                style={onlyHeader ? undefined : { display: 'none' }}
                            >
                                <HeaderMenuItems mainMenu={mainMenu} />
                            </div>

                            <div
                                className="w-6 md:w-8 md:cursor-pointer md:hover:text-orange-500 z-20"
                                onClick={toggleNavigation}
                            >
                                <BurgerHeart />
                            </div>

                            <div
                                className="absolute top-0 right-0 border-[48px] md:border-[58px] border-white border-l-transparent border-b-transparent transition-all duration-200"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Just a placeholder for the navigation */}
            {!onlyWithBurgerMenu && <div className="h-12" />}
        </>
    );
};

export default HeaderBar;
