import Link from 'next/link';
import type { ReactElement } from 'react';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import Heart from 'components/svg/Heart';

interface NavLinkData {
    link: string;
    label: string;
    subLabel?: string;
}

const NavLink = ({ link, label, subLabel }: NavLinkData): ReactElement => {

    return (
        <Link
            href={link}
            className="leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer whitespace-nowrap"
        >
            {label}

            {isNotEmptyString(subLabel) && (
                <>
                    <br />
                    <span className="text-sm font-medium">B-Side Kultur e.V.</span>
                </>
            )}
        </Link>
    );
};

const navLinks = new Array<NavLinkData>(
    {
        link: '/bside',
        label: 'Die B-Side',
    },
    {
        link: '/events',
        label: 'Veranstaltungen',
    },
    {
        link: '/',
        label: 'Kultur & Bildung',
        subLabel: 'B-Side Kultur e.V.',
    },
    {
        link: '/',
        label: 'Quartiersarbeit',
        subLabel: 'B-Side GmbH',
    },
);

const DesktopHeaderBar = (): ReactElement => {

    return (
        <header className="fixed top-0 left-0 right-0 z-20">
            <div className="bg-white p-4 pb-2">
                <Link
                    href="/"
                    className="absolute left-8 w-6 hover:text-orange-500 cursor-pointer"
                    aria-label="Zurück zur Startseite"
                >
                    <Heart />
                </Link>

                <nav className="text-md lg:text-lg font-bold font-serif text-center md:w-[40rem] lg:w-[55rem] xl:w-[60rem] mx-auto flex justify-around">
                    {navLinks.map(navLink => (
                        <NavLink
                            key={navLink.label}
                            link={navLink.link}
                            label={navLink.label}
                            subLabel={navLink.subLabel}
                        />
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default DesktopHeaderBar;
