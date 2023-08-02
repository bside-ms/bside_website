import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import MobileNavigationLink from '@/components/Layout/Navigation/Mobile/MobileNavigationLink';

const MobileNavigationItems = (): ReactElement => {

    return (
        <div className="flex flex-col items-end gap-6 text-right">

            {/* ToDo: Disable this, if already on home. */}
            <MobileNavigationLink href="/" color="#ffffff">
                Start
            </MobileNavigationLink>

            <MobileNavigationLink href="/events" color="#93e613">
                Veranstaltungen
            </MobileNavigationLink>

            <MobileNavigationLink href="/bside" color="#245ec5">
                Die B-Side
            </MobileNavigationLink>

            <MobileNavigationLink href="/kultur" color="#f87914">
                <div className="leading-4">
                    Kultur & Bildung
                    <span className="text-sm"><br />B-Side Kultur e.V.</span>
                </div>
            </MobileNavigationLink>

            <MobileNavigationLink href="/gmbh" color="#8100fd">
                <div className="leading-4">
                    Quartiersarbeit
                    <span className="text-sm"><br />B-Side GmbH</span>
                </div>
            </MobileNavigationLink>

            <MobileNavigationLink href="/kontakt" color="#93e613">
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
        </div>
    );
};

export default MobileNavigationItems;
