import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import type { MainMenu } from '../../types/payload/payload-types';
import HeaderMenuItems from '../navigation/HeaderMenuItems';
import { useAppContext } from 'components/common/AppContext';
import BurgerHeart from 'components/svg/BurgerHeart';
import Heart from 'components/svg/Heart';

interface Props {
    leftLogo?: boolean;
    headerMenu?: boolean;
    mainMenu?: MainMenu;
}

const HeaderBar = ({ leftLogo = false, headerMenu = false, mainMenu = undefined }: Props): ReactElement => {

    const { toggleNavigation } = useAppContext();

    const { pathname, push } = useRouter();

    const handleClickOnHeart = useCallback(
        () => pathname === '/'
            ? window.scrollTo({ top: 0, behavior: 'smooth' })
            : push('/'),
        [pathname, push]
    );

    return (
        <div
            className="sticky top-0 left-0 right-0 z-10 transition-colors duration-200"
            style={leftLogo ? undefined : { backgroundColor: 'white' }}
        >
            <div className="lg:w-[60rem] lg:mx-auto">
                <div>
                    <div className="p-4 flex justify-between">
                        <div
                            className="w-6 md:w-8 md:cursor-pointer md:hover:text-orange-500 transition-opacity duration-200"
                            style={leftLogo ? { opacity: 0 } : { opacity: '100%' }}
                            onClick={handleClickOnHeart}
                        >
                            <Heart />
                        </div>

                        <div
                            className="hidden lg:block text-center justify-center transition-none"
                            style={headerMenu ? undefined : { display: 'none' }}
                        >
                            <HeaderMenuItems mainMenu={mainMenu} />
                        </div>

                        <div
                            className="w-6 md:w-8 md:cursor-pointer md:hover:text-orange-500"
                            onClick={toggleNavigation}
                        >
                            <BurgerHeart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
