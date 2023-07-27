import Link from 'next/link';
import type { ReactElement } from 'react';

const DesktopMenuItems = (): ReactElement => {

    return (
        <nav className="text-md md:text-lg font-bold font-serif w-[60rem] mx-auto flex">

            <Link
                key="header__bside"
                href="/bside"
                className="flex-1 leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Die B-Side
            </Link>
            <Link
                key="header__events"
                href="/events"
                className="flex-1 leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Veranstaltungen
            </Link>
            <Link
                key="header__kultur"
                href="/kultur"
                className="flex-1 leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Kultur & Bildung
                <span className="text-sm font-medium"><br />B-Side Kultur e.V.</span>
            </Link>

            <Link
                key="header__quartier"
                href="/"
                className="flex-1 leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Quartiersarbeit
                <span className="text-sm font-medium"><br />B-Side GmbH</span>
            </Link>
        </nav>
    );
};

export default DesktopMenuItems;
