import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import HeaderBarDesktop from '@/components/Layout/Header/HeaderBarDesktop';
import HeaderBarMobile from '@/components/Layout/Header/HeaderBarMobile';

const HeaderBar = (): ReactElement => {

    const { isMd } = useBreakpointContext();

    if (isMd) {
        return <HeaderBarDesktop />;
    }

    return <HeaderBarMobile />;
};

export default HeaderBar;
