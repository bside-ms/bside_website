import Link from 'next/link';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { toKebabCase } from '@/lib/common/toKebabCase';

interface Props {
    title: string;
    text: string;
    href: string;
}

const Button = ({ title, href, text }: Props): ReactElement => {

    return (
        <div
            key={`cta-${toKebabCase(title)}`}
            className="mx-auto py-4 text-center"
        >
            {(!isEmptyString(title) && (
                <div className="font-bold font-serif text-xl md:text-2xl mb-1 md:mb-3 ">
                    {title}
                </div>
            ))}

            <Link
                href={href}
                className="block text-lg py-1 md:py-3 text-white font-bold bg-black md:cursor-pointer md:hover:text-black md:hover:bg-orange-500"
            >
                {text}
            </Link>
        </div>
    );
};

export default Button;
