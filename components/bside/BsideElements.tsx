import Link from 'next/link';
import type { ReactElement } from 'react';
import { SvgHistory } from '@/components/svg/History';
import { SvgHouse } from '@/components/svg/House';
import { SvgKollektiv } from '@/components/svg/Kollektiv';
import { SvgLegal } from '@/components/svg/Legal';
import type { AboutBside } from '@/types/payload/payload-types';

interface Props {
    about: AboutBside;
}

const BsideElements = ({ about }: Props): ReactElement => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Link
                href="/bside/haus"
                aria-label={about.firstSection.description}
                className="bg-black py-4 flex text-white hover:bg-orange-500 hover:text-black"
            >
                <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32 my-auto">
                    <SvgHouse
                        className="fill-current w-[100px] md:w-28 lg:w-32 p-4"
                    />
                </div>
                <div className="flex-1 px-2 lg:px-4 my-auto">
                    <p className="font-serif text-lg md:text-xl">
                        {about.firstSection.title}
                    </p>
                    <p className="text-sm sm:text-base">
                        {about.firstSection.description}
                    </p>
                </div>
            </Link>

            <Link
                href="/bside/kollektiv"
                aria-label={about.secondSection.description}
                className="bg-black py-4 flex text-white hover:bg-cyan-500 hover:text-black"
            >
                <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32 my-auto">
                    <SvgKollektiv
                        className="fill-current w-[100px] md:w-28 lg:w-32 p-4"
                    />
                </div>
                <div className="flex-1 px-2 lg:px-4 my-auto">
                    <p className="font-serif text-lg md:text-xl">
                        {about.secondSection.title}
                    </p>
                    <p className="text-sm sm:text-base">
                        {about.secondSection.description}
                    </p>
                </div>
            </Link>

            <Link
                href="/bside/history"
                aria-label={about.thirdSection.description}
                className="bg-black py-4 flex text-white hover:bg-red-500 hover:text-black"
            >
                <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32 my-auto">
                    <SvgHistory
                        className="fill-current w-[100px] md:w-28 lg:w-32 p-4"
                    />
                </div>
                <div className="flex-1 px-2 lg:px-4 my-auto">
                    <p className="font-serif text-lg md:text-xl">
                        {about.thirdSection.title}
                    </p>
                    <p className="text-sm sm:text-base">
                        {about.thirdSection.description}
                    </p>
                </div>
            </Link>

            <Link
                href="/bside/traegerschaft"
                aria-label={about.fourthSection.description}
                className="bg-black py-4 flex text-white hover:bg-green-500 hover:text-black"
            >
                <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32 my-auto">
                    <SvgLegal
                        className="fill-current w-[100px] md:w-28 lg:w-32 p-4"
                    />
                </div>
                <div className="flex-1 px-2 lg:px-4 my-auto">
                    <p className="font-serif text-lg md:text-xl">
                        {about.fourthSection.title}
                    </p>
                    <p className="text-sm sm:text-base">
                        {about.fourthSection.description}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default BsideElements;
