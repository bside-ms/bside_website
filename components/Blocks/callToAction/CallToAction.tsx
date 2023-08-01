import Link from 'next/link';
import type { ReactElement } from 'react';
import Chevron from '@/components/svg/Chevron';
import { toKebabCase } from '@/lib/common/toKebabCase';

interface Props {
    title: string;
    text: string;
    href: string;
    withArrows?: boolean;
}

const CallToAction = ({ title, href, text, withArrows = true }: Props): ReactElement => {

    return (
        <div
            key={`cta-${toKebabCase(title)}`}
            className="relative w-[94%] mx-auto border-4 border-black px-6 py-4 text-center"
        >
            {withArrows && (
                <div className="absolute w-4 md:w-6 top-1/2 -translate-y-1/2 right-[102%]">
                    <Chevron />
                </div>
            )}
            <div className="font-bold font-serif text-xl md:text-2xl">
                {title}
            </div>
            <Link
                href={href}
                className="block text-lg py-1 md:py-3 mt-1 md:mt-3 text-white bg-black md:cursor-pointer md:hover:text-black md:hover:bg-orange-500"
            >
                {text}
            </Link>
            {withArrows && (
                <div className="absolute w-4 md:w-6 -scale-x-100 top-1/2 -translate-y-1/2 left-[102%]">
                    <Chevron />
                </div>
            )}
        </div>
    );
};

export default CallToAction;
