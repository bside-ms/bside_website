import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import HeaderBanner from '@/components/layout/header/HeaderBanner';
import { DesktopNavigationItems } from '@/components/layout/navigation/desktop/DesktopNavigationItems';
import { DesktopNavigationLink } from '@/components/layout/navigation/desktop/DesktopNavigationLink';
import Heart from '@/components/svg/Heart';

const HeaderBarDesktop = (): ReactElement => {
    const { locale, asPath } = useRouter();

    return (
        <header className="sticky inset-x-0 top-0 z-[60]">
            <a
                href="#content"
                className="sr-only left-0 top-2 whitespace-nowrap font-serif text-xs uppercase leading-none text-black hover:text-orange-500 focus:not-sr-only focus:absolute"
            >
                Zum Inhalt springen
            </a>

            <HeaderBanner />

            <div className="relative bg-white p-4 pb-2">
                <nav className="mx-auto flex justify-between text-center font-serif text-base font-bold lg:w-[54rem] lg:text-lg xl:w-[70rem]">
                    <Link href="/" className="w-6 cursor-pointer hover:text-orange-500" aria-label="Zurück zur Startseite">
                        <Heart />
                    </Link>

                    {DesktopNavigationItems.map((navLink) => (
                        <DesktopNavigationLink
                            key={locale !== 'en' ? navLink.labelDe : navLink.labelEn}
                            link={navLink.link}
                            label={locale !== 'en' ? navLink.labelDe : navLink.labelEn}
                            subLabel={navLink.subLabel}
                        />
                    ))}
                </nav>

                <Link
                    href={asPath !== '/' ? asPath : locale === 'de' ? '/en' : '/'}
                    className="absolute right-8 top-4 flex w-6 cursor-pointer justify-around text-center hover:text-orange-500"
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
