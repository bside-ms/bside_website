import Link from 'next/link';
import type { ReactElement } from 'react';
import Chevron from '@/components/svg/Chevron';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { toKebabCase } from '@/lib/common/toKebabCase';

interface Props {
    title?: string | null;
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
                <div className="absolute right-[102%] top-1/2 w-4 -translate-y-1/2 md:w-6">
                    <Chevron />
                </div>
            )}

            {!isEmptyString(title) && (
                <div className="mb-1 font-serif text-xl font-bold md:mb-3 md:text-2xl">{title}</div>
            )}

            <Link
                href={href}
                className="block bg-black py-1 text-lg text-white md:cursor-pointer md:py-3 md:hover:bg-orange-500 md:hover:text-black"
            >
                {text}
            </Link>

            {withArrows && (
                <div className="absolute left-[102%] top-1/2 w-4 -translate-y-1/2 -scale-x-100 md:w-6">
                    <Chevron />
                </div>
            )}
        </div>
    );
};

export default CallToAction;
