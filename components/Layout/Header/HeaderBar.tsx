import Link from 'next/link';
import type { ReactElement } from 'react';
import DesktopMenuItems from '@/components/Layout/Header/DesktopMenuItems';
import MobileLogo from '@/components/Layout/Header/MobileLogo';
import MobileNavigation from '@/components/Layout/Header/MobileNavigation';
import Heart from 'components/svg/Heart';

interface Props {
    disableLeftLogo?: boolean;
    headerMenu?: boolean;
    banner?: boolean;
}

const HeaderBar = ({ disableLeftLogo = false, headerMenu = false, banner = false }: Props): ReactElement => {
    return (
        <header className={`fixed top-0 left-0 right-0 z-20 ${banner ? 'top-[44px]' : ''}`}>
            <div className="p-4 md:p-0 flex justify-between relative">

                <MobileLogo disableLogo={disableLeftLogo} />

                <div
                    className="hidden md:block w-full bg-white text-center transition-none px-4 pt-4 pb-2"
                    style={!banner && headerMenu ? undefined : { display: 'none' }}
                >
                    <Link
                        href="/"
                        className="absolute left-0 w-6 mx-8 hover:text-orange-500 cursor-pointer"
                        aria-label="Zurück zur Startseite"
                    >
                        <Heart />
                    </Link>

                    <DesktopMenuItems />
                </div>

                <MobileNavigation />

            </div>
        </header>
    );
};

export default HeaderBar;
