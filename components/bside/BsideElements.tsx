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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
                href="/bside/haus"
                aria-label={about.firstSection.description}
                className="flex bg-black py-4 text-white hover:bg-orange-500 hover:text-black"
            >
                <div className="my-auto hidden w-[100px] min-[320px]:block md:w-28 lg:w-32">
                    <SvgHouse className="w-[100px] fill-current p-4 md:w-28 lg:w-32" />
                </div>
                <div className="my-auto flex-1 px-2 lg:px-4">
                    <p className="font-serif text-lg md:text-xl">{about.firstSection.title}</p>
                    <p className="text-sm sm:text-base">{about.firstSection.description}</p>
                </div>
            </Link>

            <Link
                href="/bside/kollektiv"
                aria-label={about.secondSection.description}
                className="flex bg-black py-4 text-white hover:bg-cyan-500 hover:text-black"
            >
                <div className="my-auto hidden w-[100px] min-[320px]:block md:w-28 lg:w-32">
                    <SvgKollektiv className="w-[100px] fill-current p-4 md:w-28 lg:w-32" />
                </div>
                <div className="my-auto flex-1 px-2 lg:px-4">
                    <p className="font-serif text-lg md:text-xl">{about.secondSection.title}</p>
                    <p className="text-sm sm:text-base">{about.secondSection.description}</p>
                </div>
            </Link>

            <Link
                href="/bside/history"
                aria-label={about.thirdSection.description}
                className="flex bg-black py-4 text-white hover:bg-red-500 hover:text-black"
            >
                <div className="my-auto hidden w-[100px] min-[320px]:block md:w-28 lg:w-32">
                    <SvgHistory className="w-[100px] fill-current p-4 md:w-28 lg:w-32" />
                </div>
                <div className="my-auto flex-1 px-2 lg:px-4">
                    <p className="font-serif text-lg md:text-xl">{about.thirdSection.title}</p>
                    <p className="text-sm sm:text-base">{about.thirdSection.description}</p>
                </div>
            </Link>

            <Link
                href="/bside/traegerschaft"
                aria-label={about.fourthSection.description}
                className="flex bg-black py-4 text-white hover:bg-green-500 hover:text-black"
            >
                <div className="my-auto hidden w-[100px] min-[320px]:block md:w-28 lg:w-32">
                    <SvgLegal className="w-[100px] fill-current p-4 md:w-28 lg:w-32" />
                </div>
                <div className="my-auto flex-1 px-2 lg:px-4">
                    <p className="font-serif text-lg md:text-xl">{about.fourthSection.title}</p>
                    <p className="text-sm sm:text-base">{about.fourthSection.description}</p>
                </div>
            </Link>
        </div>
    );
};

export default BsideElements;
