import Link from 'next/link';
import type { ReactElement } from 'react';
import { DesktopNavigationItems } from '@/components/layout/navigation/desktop/DesktopNavigationItems';
import DesktopNavigationLink from '@/components/layout/navigation/desktop/DesktopNavigationLink';
import Heart from '@/components/svg/Heart';

const HeaderBarDesktop = (): ReactElement => {

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
                    {DesktopNavigationItems.map(navLink => (
                        <DesktopNavigationLink
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

export default HeaderBarDesktop;
