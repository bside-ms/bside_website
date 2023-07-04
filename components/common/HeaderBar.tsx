import { useCallback } from 'react';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import type { MainMenu } from '../../types/payload/payload-types';
import HeaderMenuItems from '../navigation/HeaderMenuItems';
import { useAppContext } from 'components/common/AppContext';
import BurgerHeart from 'components/svg/BurgerHeart';
import Heart from 'components/svg/Heart';

interface MobileLogoProps {
disableLogo: boolean;
}
const MobileLogo = ({ disableLogo = false }: MobileLogoProps): ReactElement => {
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
                className="sm:hidden absolute top-0 left-0 border-[50px] md:border-[60px] border-transparent transition-all duration-200"
                style={disableLogo ? undefined : { borderTopColor: 'white', borderLeftColor: 'white' }}
            />
            <div
                className="sm:hidden w-6 md:w-8 md:cursor-pointer md:hover:text-orange-500 transition-opacity duration-200 z-20"
                style={disableLogo ? { opacity: 0 } : { opacity: '100%' }}
                onClick={handleClickOnHeart}
            >
                <Heart />
            </div>
        </>
    );
};

const MobileNavigation = (): ReactElement => {
    const { toggleNavigation } = useAppContext();

    return (
        <>
            <div
                className="sm:hidden w-6 md:w-8 md:cursor-pointer md:hover:text-orange-500 z-20"
                onClick={toggleNavigation}
            >
                <BurgerHeart />
            </div>
            <div
                className="sm:hidden absolute top-0 right-0 border-[50px] md:border-[60px] border-white border-l-transparent border-b-transparent transition-all duration-200"
            />
        </>
    );
};

interface Props {
    disableLeftLogo?: boolean;
    headerMenu?: boolean;
    mainMenu?: MainMenu;
    banner?: boolean;
}

const HeaderBar = ({ disableLeftLogo = false, headerMenu = false, mainMenu = undefined, banner = false }: Props): ReactElement => {
    return (
        <div className={`fixed top-0 left-0 right-0 z-10 ${banner ? 'top-[44px]' : ''}`}>
            <div className="">
                <div>
                    <div className="p-4 sm:p-0 flex justify-between relative">

                        <MobileLogo disableLogo={disableLeftLogo} />

                        <div
                            className="hidden lg:block w-full bg-white text-center justify-center transition-none py-2"
                            style={!banner && headerMenu ? undefined : { display: 'none' }}
                        >
                            <HeaderMenuItems mainMenu={mainMenu} />
                        </div>

                        <MobileNavigation />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
