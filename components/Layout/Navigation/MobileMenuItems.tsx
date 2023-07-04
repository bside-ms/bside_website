import type { ReactElement } from 'react';
import MobileNavigationLink from '@/components/Layout/Navigation/MobileNavigationLink';

const MobileMenuItems = (): ReactElement => {

    return (
        <div className="flex flex-col items-end gap-7 text-right">
            <MobileNavigationLink href="/">
                Start
            </MobileNavigationLink>

            <MobileNavigationLink href="/events">
                Veranstaltungen
            </MobileNavigationLink>

            <MobileNavigationLink href="/bside">
                Die B-Side
            </MobileNavigationLink>

            <MobileNavigationLink href="/kultur">
                Kultur & Bildung
            </MobileNavigationLink>

            <MobileNavigationLink href="/kontakt">
                Kontakt
            </MobileNavigationLink>
        </div>
    );
};

export default MobileMenuItems;
