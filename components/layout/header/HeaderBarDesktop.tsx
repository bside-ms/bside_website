import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { DesktopNavigationItems } from '@/components/layout/navigation/desktop/DesktopNavigationItems';
import DesktopNavigationLink from '@/components/layout/navigation/desktop/DesktopNavigationLink';
import Heart from '@/components/svg/Heart';

const HeaderBarDesktop = (): ReactElement => {

    const { locale, asPath } = useRouter();

    return (
        <header className="fixed top-0 left-0 right-0 z-20">
            <div className="flex flex-row align-bottom max-w-wide w-full relative">
                <a
                    href="#content"
                    className="sr-only focus:not-sr-only focus:absolute top-2 left-0 whitespace-nowrap font-serif text-2xs uppercase leading-none text-black hover:text-orange"
                >
                    Zum Inhalt springen
                </a>
            </div>

            <div className="bg-white p-4 pb-2">
                <Link
                    href="/"
                    className="absolute left-8 w-6 hover:text-orange-500 cursor-pointer"
                    aria-label="Zurück zur Startseite"
                >
                    <Heart />
                </Link>

                <Link
                    href={asPath !== '/' ? `${asPath}` : locale === 'de' ? '/en' : '/'}
                    className="absolute right-8 w-6 hover:text-orange-500 cursor-pointer justify-around flex text-center"
                    aria-label={locale !== 'en' ? 'Show the english version' : 'Deutschsprachige Version anzeigen'}
                    locale={locale !== 'en' ? 'en' : 'de'}
                >
                    {locale !== 'en' ? 'EN' : 'DE'}
                </Link>

                <nav className="text-md lg:text-lg font-bold font-serif text-center md:w-[45rem] lg:w-[55rem] xl:w-[60rem] mx-auto flex justify-around">
                    {DesktopNavigationItems.map(navLink => (
                        <DesktopNavigationLink
                            key={locale !== 'en' ? navLink.labelDe : navLink.labelEn}
                            link={navLink.link}
                            label={locale !== 'en' ? navLink.labelDe : navLink.labelEn}
                            subLabel={navLink.subLabel}
                        />
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default HeaderBarDesktop;
