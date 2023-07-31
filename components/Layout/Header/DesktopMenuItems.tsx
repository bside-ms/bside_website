import Link from 'next/link';
import type { ReactElement } from 'react';

const DesktopMenuItems = (): ReactElement => {

    return (
        <nav className="text-md lg:text-lg font-bold font-serif text-center md:w-[40rem] lg:w-[55rem] xl:w-[60rem] mx-auto flex justify-around">
            <Link
                href="/bside"
                className="leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Die&nbsp;B-Side
            </Link>
            <Link
                href="/events"
                className="leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Veranstaltungen
            </Link>
            <Link
                href="/kultur"
                className="leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Kultur & Bildung
                <span className="text-sm font-medium"><br />B-Side&nbsp;Kultur&nbsp;e.V.</span>
            </Link>

            <Link
                href="/"
                className="leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer"
            >
                Quartiersarbeit
                <span className="text-sm font-medium"><br />B-Side&nbsp;GmbH</span>
            </Link>
        </nav>
    );
};

export default DesktopMenuItems;
