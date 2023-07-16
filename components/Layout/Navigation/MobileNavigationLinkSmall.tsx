import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement, SyntheticEvent } from 'react';
import { useAppContext } from '@/components/Layout/Next/AppContext';
import isEmptyString from '@/lib/common/helper/isEmptyString';

interface Props {
    children: ReactElement | string;
    href: string;
    color: string;
}

const MobileNavigationLinkSmall = ({ children, href, color }: Props): ReactElement => {

    const { pathname } = useRouter();
    const { toggleNavigation } = useAppContext();

    const isActivePage = pathname === href;

    const handleClick = useCallback((event: SyntheticEvent<HTMLSpanElement>) => {

        event.preventDefault();
        event.stopPropagation();

        if (!isActivePage) {
            toggleNavigation();
        }
    }, [isActivePage, toggleNavigation]);

    return (
        <span
            className={`text-[12px] leading-[0.7] text-white font-serif cursor-default md:cursor-pointer whitespace-nowrap ${isActivePage ? 'italic' : ''}`}
            style={!isActivePage && !isEmptyString(color) ? undefined : { color }}
            onClick={handleClick}
        >
            {isActivePage ? children : <Link href={href}>{children}</Link>}
        </span>
    );
};

export default MobileNavigationLinkSmall;
