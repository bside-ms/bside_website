import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import MobileNavigationLink from '@/components/layout/navigation/mobile/MobileNavigationLink';
import { colors } from '@blocks/circleOverviewBlock/CircleOverview';

const MobileNavigationItemsEnglish = (): ReactElement => {

    const { asPath } = useRouter();

    return (
        <div className="flex flex-col items-end gap-6 text-right">

            <MobileNavigationLink href="/" color={colors[0 % colors.length]!}>
                Home
            </MobileNavigationLink>

            <MobileNavigationLink href="/events" color={colors[1 % colors.length]!}>
                Events
            </MobileNavigationLink>

            <MobileNavigationLink href="/bside" color={colors[2 % colors.length]!}>
                About B-Side
            </MobileNavigationLink>

            <MobileNavigationLink href="/kultur" color={colors[3 % colors.length]!}>
                <div className="leading-4">
                    Culture & Education
                    <span className="text-sm"><br />B-Side Kultur e.V.</span>
                </div>
            </MobileNavigationLink>

            <MobileNavigationLink href="/quartier" color={colors[4 % colors.length]!}>
                <div className="leading-4">
                    Neighbourhood Wwork
                    <span className="text-sm"><br />B-Side GmbH</span>
                </div>
            </MobileNavigationLink>

            <MobileNavigationLink href="/aktuelles" color={colors[5 % colors.length]!}>
                News
            </MobileNavigationLink>

            <MobileNavigationLink href="/kontakt" color={colors[6 % colors.length]!}>
                Contact
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
                href={`${asPath}`}
                className="text-white text-sm hover:text-orange-500 cursor-pointer"
                aria-label="Deutschsprachige Version anzeigen"
                locale="de"
            >
                Zur deutschsprachigen Version
            </Link>
        </div>
    );
};

export default MobileNavigationItemsEnglish;
