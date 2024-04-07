import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import HeaderBarDesktop from '@/components/layout/header/HeaderBarDesktop';
import HeaderBarMobile from '@/components/layout/header/HeaderBarMobile';

const HeaderBar = (): ReactElement => {
    const { isLg } = useBreakpointContext();

    if (isLg) {
        return <HeaderBarDesktop />;
    }

    return <HeaderBarMobile />;
};

export default HeaderBar;
