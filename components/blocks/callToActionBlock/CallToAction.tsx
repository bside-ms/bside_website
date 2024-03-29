import Link from 'next/link';
import type { ReactElement } from 'react';
import Chevron from '@/components/svg/Chevron';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { toKebabCase } from '@/lib/common/toKebabCase';

interface Props {
    title: string | undefined;
    text: string;
    href: string;
    withArrows?: boolean;
}

const CallToAction = ({ title, href, text, withArrows = true }: Props): ReactElement => {

    const width = withArrows ? 'w-[94%]' : 'w-full';
    const key = !isEmptyString(title) ? `cta-${toKebabCase(title)}` : `cta-${toKebabCase(text)}`;

    return (
        <div
            key={key}
            className={`relative ${width} mx-auto border-4 border-black px-6 py-4 text-center`}
        >
            {withArrows && (
                <div className="absolute w-4 md:w-6 top-1/2 -translate-y-1/2 right-[102%]">
                    <Chevron />
                </div>
            )}

            {(!isEmptyString(title) && (
                <div className="font-bold font-serif text-xl md:text-2xl mb-1 md:mb-3 ">
                    {title}
                </div>
            ))}

            <Link
                href={href}
                className="block text-lg py-1 md:py-3 text-white bg-black md:cursor-pointer md:hover:text-black md:hover:bg-orange-500"
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
