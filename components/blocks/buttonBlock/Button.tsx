import clsx from 'clsx';
import Link from 'next/link';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { toKebabCase } from '@/lib/common/toKebabCase';

interface Props {
    title?: string | null;
    text: string;
    href: string;
    target?: '_blank' | '_self';
    inverse?: boolean;
}

const Button = ({ title, href, text, target = '_self', inverse = false }: Props): ReactElement => {
    return (
        <div key={!isEmptyString(title) ? `cta-${toKebabCase(title)}` : `cta-${toKebabCase(text)}`} className="mx-auto py-4 text-center">
            {!isEmptyString(title) && <div className="mb-1 font-serif text-xl font-bold md:mb-3 md:text-2xl">{title}</div>}

            <Link
                href={href}
                target={target}
                className={clsx(
                    'block py-1 text-lg font-bold md:cursor-pointer md:py-3',
                    !inverse
                        ? 'bg-black text-white md:hover:bg-orange-500 md:hover:text-black'
                        : 'rounded-2xl bg-white text-black md:hover:bg-orange-500 md:hover:text-white',
                )}
            >
                {text}
            </Link>
        </div>
    );
};

export default Button;
