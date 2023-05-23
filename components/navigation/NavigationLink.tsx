import { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement, SyntheticEvent } from 'react';
import { useAppContext } from 'components/common/AppContext';

interface Props {
    children: ReactElement | string;
    href: string;
}

const NavigationLink = ({ children, href }: Props): ReactElement => {

    const { pathname } = useRouter();
    const { toggleNavigation } = useAppContext();

    const isActivePage = pathname === href;

    const handleClick = useCallback((event: SyntheticEvent<HTMLDivElement>) => {

        event.preventDefault();
        event.stopPropagation();

        if (!isActivePage) {
            toggleNavigation();
        }
    }, [isActivePage, toggleNavigation]);

    return (
        <div className="text-[30px] leading-[1.1] text-white font-serif" onClick={handleClick}>
            <span
                className="cursor-default md:cursor-pointer whitespace-nowrap"
                style={{ fontStyle: isActivePage ? 'italic' : '' }}
            >
                {isActivePage ? children : <Link href={href}>{children}</Link>}
            </span>
        </div>
    );
};

export default NavigationLink;
