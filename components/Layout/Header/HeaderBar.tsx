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
        <div className={`fixed top-0 left-0 right-0 z-40 ${banner ? 'top-[44px]' : ''}`}>
            <div className="">
                <div>
                    <div className="p-4 sm:p-0 flex justify-between relative">

                        <MobileLogo disableLogo={disableLeftLogo} />

                        <div
                            className="hidden sm:block w-full bg-white text-center transition-none py-2"
                            style={!banner && headerMenu ? undefined : { display: 'none' }}
                        >
                            <Link
                                href="/"
                                className="absolute left-0 w-6 mx-8 hover:text-orange-500 cursor-pointer"
                            >
                                <Heart />
                            </Link>

                            <DesktopMenuItems />
                        </div>

                        <MobileNavigation />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
