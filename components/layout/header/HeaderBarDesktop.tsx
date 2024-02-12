import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import HeaderBanner from '@/components/layout/header/HeaderBanner';
import { DesktopNavigationItems } from '@/components/layout/navigation/desktop/DesktopNavigationItems';
import DesktopNavigationLink from '@/components/layout/navigation/desktop/DesktopNavigationLink';
import Heart from '@/components/svg/Heart';

const HeaderBarDesktop = (): ReactElement => {

    const { locale, asPath } = useRouter();

    return (
        <header className="sticky top-0 left-0 right-0 z-20">
            <a
                href="#content"
                className="sr-only focus:not-sr-only focus:absolute top-2 left-0 whitespace-nowrap font-serif text-2xs uppercase leading-none text-black hover:text-orange"
            >
                Zum Inhalt springen
            </a>

            <HeaderBanner />

            <div className="bg-white p-4 pb-2 relative">
                <nav className="text-md lg:text-lg font-bold font-serif text-center lg:w-[54rem] xl:w-[70rem] mx-auto flex justify-between">
                    <Link
                        href="/"
                        className="w-6 hover:text-orange-500 cursor-pointer"
                        aria-label="Zurück zur Startseite"
                    >
                        <Heart />
                    </Link>

                    {DesktopNavigationItems.map(navLink => (
                        <DesktopNavigationLink
                            key={locale !== 'en' ? navLink.labelDe : navLink.labelEn}
                            link={navLink.link}
                            label={locale !== 'en' ? navLink.labelDe : navLink.labelEn}
                            subLabel={navLink.subLabel}
                        />
                    ))}
                </nav>

                <Link
                    href={asPath !== '/' ? `${asPath}` : locale === 'de' ? '/en' : '/'}
                    className="absolute top-4 right-8 w-6 hover:text-orange-500 cursor-pointer justify-around flex text-center"
                    aria-label={locale !== 'en' ? 'Show the english version' : 'Deutschsprachige Version anzeigen'}
                    locale={locale !== 'en' ? 'en' : 'de'}
                >
                    {locale !== 'en' ? 'EN' : 'DE'}
                </Link>
            </div>
        </header>
    );
};

export default HeaderBarDesktop;
