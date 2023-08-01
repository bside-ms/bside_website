import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import DesktopHeaderBar from '@/components/Layout/Header/DesktopHeaderBar';
import MobileHeaderBar from '@/components/Layout/Header/MobileHeaderBar';

const HeaderBarContainer = (): ReactElement => {

    const { isMd } = useBreakpointContext();

    if (isMd) {
        return <DesktopHeaderBar />;
    }

    return <MobileHeaderBar />;
};

export default HeaderBarContainer;
