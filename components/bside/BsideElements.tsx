import Link from 'next/link';
import type { ReactElement } from 'react';
import { SvgHistory } from '@/components/svg/History';
import { SvgHouse } from '@/components/svg/House';
import { SvgKollektiv } from '@/components/svg/Kollektiv';
import { SvgLegal } from '@/components/svg/Legal';

const BsideElements = (): ReactElement => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Das Haus */}
            <Link
                href="/bside/haus"
                aria-label="Erfahre mehr über das Haus und was wir darin machen"
                className="bg-black py-4 flex text-white hover:bg-orange-500 hover:text-black"
            >
                <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32 my-auto">
                    <SvgHouse
                        className="fill-current w-[100px] md:w-28 lg:w-32 p-4"
                    />
                </div>
                <div className="flex-1 px-2 lg:px-4 my-auto">
                    <p className="font-serif text-lg md:text-xl">
                        Das Haus
                    </p>
                    <p className="text-sm sm:text-base">
                        Welche Räume und Bereiche gibt es?
                        Was passiert wo?
                        Was bietet dir das Haus?
                    </p>
                </div>
            </Link>

            {/* Kollektiv */}
            <Link
                href="/bside/kollektiv"
                aria-label="Erfahre mehr über das Haus und was wir darin machen"
                className="bg-black py-4 flex text-white hover:bg-cyan-500 hover:text-black"
            >
                <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32 my-auto">
                    <SvgKollektiv
                        className="fill-current w-[100px] md:w-28 lg:w-32 p-4"
                    />
                </div>
                <div className="flex-1 px-2 lg:px-4 my-auto">
                    <p className="font-serif text-lg md:text-xl">
                        Das Kollektiv<br />
                        & seine Kreise
                    </p>
                    <p className="text-sm sm:text-base">
                        Wer ist die B-Side? Wie arbeiten wir miteinander? Wo kannst du mitmachen?
                    </p>
                </div>
            </Link>

            {/* Die Vergangenheit */}
            <Link
                href="/bside/history"
                aria-label="Erfahre mehr über das Haus und was wir darin machen"
                className="bg-black py-4 flex text-white hover:bg-red-500 hover:text-black"
            >
                <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32 my-auto">
                    <SvgHistory
                        className="fill-current w-[100px] md:w-28 lg:w-32 p-4"
                    />
                </div>
                <div className="flex-1 px-2 lg:px-4 my-auto">
                    <p className="font-serif text-lg md:text-xl">
                        B-Side History
                    </p>
                    <p className="text-sm sm:text-base">
                        Erfahre mehr über die Geschichte und Hintergründe der B-Side.
                    </p>
                </div>
            </Link>

            {/* Trägerschaft */}
            <Link
                href="/bside/traegerschaft"
                aria-label="Erfahre mehr über das Haus und was wir darin machen"
                className="bg-black py-4 flex text-white hover:bg-green-500 hover:text-black"
            >
                <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32 my-auto">
                    <SvgLegal
                        className="fill-current w-[100px] md:w-28 lg:w-32 p-4"
                    />
                </div>
                <div className="flex-1 px-2 lg:px-4 my-auto">
                    <p className="font-serif text-lg md:text-xl">
                        Trägerschaft
                    </p>
                    <p className="text-sm sm:text-base">
                        Erfahre mehr über unsere formaljuristische Organisationsstruktur.
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default BsideElements;
