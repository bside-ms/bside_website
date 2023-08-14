import Link from 'next/link';
import type { ReactElement } from 'react';

const FrontPageText = (): ReactElement => (
    <div>
        <div className="font-bold font-serif text-2xl lg:text-xl">
            Die B-Side in Münster
        </div>

        <div className="mt-1 text-md lg:mt-3 md:text-lg">
            Die B-Side ist ein offener Ort der Möglichkeiten
            am <span className="line-through">Münsteraner Hafen</span> Hawerkamp,
            der von vielen Menschen selbstorganisiert entwickelt, gestaltet und
            verwaltet wird. Auch du kannst hier kreativ und aktiv werden oder
            einfach eine gute Zeit haben!
        </div>

        <div className="mt-3">
            <Link
                href="/bside"
                className="block text-lg text-center font-serif py-1 lg:py-2 mt-1 text-white bg-black lg:cursor-pointer lg:hover:text-black lg:hover:bg-orange-500"
            >
                Mehr erfahren
            </Link>
        </div>
    </div>
);

export default FrontPageText;
