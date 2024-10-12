import Link from 'next/link';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { toKebabCase } from '@/lib/common/toKebabCase';

interface Props {
    title: string;
    text: string;
    href: string;
    target?: '_blank' | '_self';
}

const Button = ({ title, href, text, target = '_self' }: Props): ReactElement => {
    return (
        <span
            key={!isEmptyString(title) ? `cta-${toKebabCase(title)}` : ''}
            className="mx-auto py-4 text-center"
        >
            {!isEmptyString(title) && (
                <div className="mb-1 font-serif text-xl font-bold md:mb-3 md:text-2xl">{title}</div>
            )}

            <Link
                href={href}
                target={target}
                className="block bg-black py-1 text-lg font-bold text-white md:cursor-pointer md:py-3 md:hover:bg-orange-500 md:hover:text-black"
            >
                {text}
            </Link>
        </span>
    );
};

export default Button;
