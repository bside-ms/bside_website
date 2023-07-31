import Link from 'next/link';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import DesktopMenuItems from '@/components/Layout/Header/DesktopMenuItems';
import MobileLogo from '@/components/Layout/Header/MobileLogo';
import MobileNavigationOverlayToggle from '@/components/Layout/Header/MobileNavigationOverlayToggle';
import MobileNavigationOverlay from '@/components/Layout/Navigation/MobileNavigationOverlay';
import Heart from 'components/svg/Heart';

interface Props {
    hideHeartLogo?: boolean;
}

const HeaderBar = ({ hideHeartLogo = false }: Props): ReactElement => {

    const { isMd } = useBreakpointContext();

    return (
        <header className="fixed top-0 left-0 right-0 z-20">
            {isMd ? (
                <div className="bg-orange-50 p-4 pb-2">
                    <Link
                        href="/"
                        className="absolute left-8 w-6 hover:text-orange-500 cursor-pointer"
                        aria-label="Zurück zur Startseite"
                    >
                        <Heart />
                    </Link>

                    <DesktopMenuItems />
                </div>
            ) : (
                <>
                    <div className="flex justify-between p-4">
                        <MobileLogo hideLogo={hideHeartLogo} />
                        <MobileNavigationOverlayToggle />
                    </div>
                    <MobileNavigationOverlay />
                </>
            )}
        </header>
    );
};

export default HeaderBar;
