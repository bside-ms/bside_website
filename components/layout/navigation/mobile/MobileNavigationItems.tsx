import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import MobileNavigationLink from '@/components/layout/navigation/mobile/MobileNavigationLink';
import { colors } from '@blocks/circleOverviewBlock/CircleOverview';

const MobileNavigationItems = (): ReactElement => {

    return (
        <div className="flex flex-col items-end gap-6 text-right">

            <MobileNavigationLink href="/" color={colors[0 % colors.length]!}>
                Start
            </MobileNavigationLink>

            <MobileNavigationLink href="/events" color={colors[1 % colors.length]!}>
                Veranstaltungen
            </MobileNavigationLink>

            <MobileNavigationLink href="/bside" color={colors[2 % colors.length]!}>
                Die B-Side
            </MobileNavigationLink>

            <MobileNavigationLink href="/kultur" color={colors[3 % colors.length]!}>
                <div className="leading-4">
                    Kultur & Bildung
                    <span className="text-sm"><br />B-Side Kultur e.V.</span>
                </div>
            </MobileNavigationLink>

            <MobileNavigationLink href="/quartier" color={colors[4 % colors.length]!}>
                <div className="leading-4">
                    Quartiersarbeit
                    <span className="text-sm"><br />B-Side GmbH</span>
                </div>
            </MobileNavigationLink>

            <MobileNavigationLink href="/bside/raumvergabe" color={colors[5 % colors.length]!}>
                <div className="leading-4">
                    Raumvergabe
                    <span className="text-sm"><br />Langfristige Nutzung</span>
                </div>
            </MobileNavigationLink>

            <MobileNavigationLink href="/kontakt" color={colors[6 % colors.length]!}>
                Kontakt
            </MobileNavigationLink>

            <Link
                href="https://www.instagram.com/bsidemuenster/"
                className="mt-4"
                target="_blank"
            >
                <Image
                    src="/assets/social/instagram.svg"
                    alt="Instagram Logo"
                    width={40}
                    height={40}
                />
            </Link>

            <Link
                href=""
                className="text-white text-sm hover:text-orange-500 cursor-pointer"
                aria-label="Show the english version"
                locale="en"
            >
                Show the english version
            </Link>
        </div>
    );
};

export default MobileNavigationItems;
