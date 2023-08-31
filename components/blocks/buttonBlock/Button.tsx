import clsx from 'clsx';
import Link from 'next/link';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { toKebabCase } from '@/lib/common/toKebabCase';

interface Props {
    title: string | undefined;
    text: string;
    href: string;
    target?: '_blank' | '_self';
    inverse?: boolean;
}

const Button = ({ title, href, text, target = '_self', inverse = false }: Props): ReactElement => {

    return (
        <div
            key={!isEmptyString(title) ? `cta-${toKebabCase(title)}` : `cta-${toKebabCase(text)}`}
            className="mx-auto py-4 text-center"
        >
            {(!isEmptyString(title) && (
                <div className="font-bold font-serif text-xl md:text-2xl mb-1 md:mb-3 ">
                    {title}
                </div>
            ))}

            <Link
                href={href}
                target={target}
                className={clsx(
                    'block text-lg py-1 md:py-3 font-bold md:cursor-pointer',
                    !inverse ? 'text-white bg-black md:hover:text-black md:hover:bg-orange-500' :
                        'rounded-2xl text-black bg-white md:hover:text-white md:hover:bg-orange-500',
                )}
            >
                {text}
            </Link>
        </div>
    );
};

export default Button;
