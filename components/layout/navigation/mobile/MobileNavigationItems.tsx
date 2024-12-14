import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import MobileNavigationLink from '@/components/layout/navigation/mobile/MobileNavigationLink';
import { colors } from '@blocks/circleOverviewBlock/CircleOverview';

const MobileNavigationItems = (): ReactElement => {
    const { asPath, locale } = useRouter();

    return (
        <div className="flex flex-col items-end gap-6 text-right">
            <MobileNavigationLink href="/" color={colors[0 % colors.length]!}>
                {locale === 'en' ? 'Home' : 'Start'}
            </MobileNavigationLink>

            <MobileNavigationLink href="/events" color={colors[1 % colors.length]!}>
                {locale === 'en' ? 'Events' : 'Veranstaltungen'}
            </MobileNavigationLink>

            <MobileNavigationLink href="/bside" color={colors[2 % colors.length]!}>
                {locale === 'en' ? 'About B-Side' : 'Die B-Side'}
            </MobileNavigationLink>

            <MobileNavigationLink href="/kultur" color={colors[3 % colors.length]!}>
                <div className="leading-4">
                    {locale === 'en' ? 'Culture & education' : 'Kultur & Bildung'}
                    <span className="text-sm">
                        <br />
                        B-Side Kultur e.V.
                    </span>
                </div>
            </MobileNavigationLink>

            <MobileNavigationLink href="/news" color={colors[5 % colors.length]!}>
                Aktuelles
            </MobileNavigationLink>

            <MobileNavigationLink href="/quartier" color={colors[4 % colors.length]!}>
                <div className="leading-4">
                    {locale === 'en' ? 'Neighbourhood work' : 'Quartiersarbeit'}
                    <span className="text-sm">
                        <br />
                        B-Side GmbH
                    </span>
                </div>
            </MobileNavigationLink>

            <MobileNavigationLink href="/quartier/b-side-cafe" color={colors[5 % colors.length]!}>
                <div className="leading-4">
                    B-Side Café
                    <span className="text-sm">
                        <br />
                        {locale === 'en' ? 'Lunch Deals' : 'Mittagstisch'}
                    </span>
                </div>
            </MobileNavigationLink>

            <MobileNavigationLink href="/kontakt" color={colors[6 % colors.length]!}>
                {locale === 'en' ? 'Contact' : 'Kontakt'}
            </MobileNavigationLink>

            <Link href="https://www.instagram.com/bsidemuenster/" className="mt-4" target="_blank">
                <Image
                    src="/assets/social/instagram.svg"
                    alt="Instagram Logo"
                    width={40}
                    height={40}
                />
            </Link>

            <Link
                href={asPath !== '/' ? asPath : locale === 'de' ? '/en' : '/'}
                className="cursor-pointer text-sm text-white hover:text-orange-500"
                aria-label={
                    locale !== 'en'
                        ? 'Show the english version'
                        : 'Deutschsprachige Version anzeigen'
                }
                locale={locale !== 'en' ? 'en' : 'de'}
            >
                {locale !== 'en' ? 'Show the english version' : 'Zur deutschsprachigen Version'}
            </Link>
        </div>
    );
};

export default MobileNavigationItems;
