import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useAppContext } from 'components/common/AppContext';

interface Props {
    children: ReactElement | string;
    href: string;
}

const NavigationLink = ({ children, href }: Props): ReactElement => {

    const { pathname } = useRouter();
    const { toggleNavigation } = useAppContext();

    const isActivePage = useMemo(() => pathname === href, [href, pathname]);

    if (isActivePage) {
        return (
            <div className="text-2xl text-orange-500 font-serif" onClick={toggleNavigation}>
                <span
                    className="cursor-default md:cursor-pointer italic"
                >
                    {children}
                </span>
            </div>
        );
    }

    return (
        <div className="text-2xl text-white font-serif">
            <Link
                href={href}
                className="cursor-default md:cursor-pointer"
            >
                {children}
            </Link>
        </div>
    );
};

export default NavigationLink;
