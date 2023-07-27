import Link from 'next/link';
import type { ReactElement } from 'react';

const DesktopMenuItems = (): ReactElement => {

    return (
        <nav className="text-md lg:text-lg font-bold font-serif md:w-[40rem] lg:w-[55rem] xl:w-[60rem] mx-auto flex">

            <Link
                key="header__bside"
                href="/bside"
                className="flex-auto leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Die&nbsp;B-Side
            </Link>
            <Link
                key="header__events"
                href="/events"
                className="flex-auto leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Veranstaltungen
            </Link>
            <Link
                key="header__kultur"
                href="/kultur"
                className="flex-auto leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Kultur&nbsp;&&nbsp;Bildung
                <span className="text-sm font-medium"><br />B-Side&nbsp;Kultur&nbsp;e.V.</span>
            </Link>

            <Link
                key="header__quartier"
                href="/"
                className="flex-auto leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Quartiersarbeit
                <span className="text-sm font-medium"><br />B-Side&nbsp;GmbH</span>
            </Link>
        </nav>
    );
};

export default DesktopMenuItems;
