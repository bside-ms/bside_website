import Link from 'next/link';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { HeadlineLevel } from '@blocks/HeadlineBlock';

interface Props {
    level: HeadlineLevel;
    children: string;
    link?: string | null;
}

const HeadlineKicker = ({ children, level, link = '' }: Props): ReactElement => {

    const content = (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <span dangerouslySetInnerHTML={{ __html: children }} />
            <span className="sr-only">:</span>
        </>
    );

    const linkContent = (
        <>
            {!isEmptyString(link) && (
                <Link href={link} className="hover:text-orange-500 hover:font-bold">
                    {content}
                </Link>
            )}

            {isEmptyString(link) && (
                <>
                    { content }
                </>
            )}
        </>
    );

    switch (level) {
        case 'h1':
            return (
                <small className="block font-normal leading-none tracking-normal italic text-base md:text-base mb-1">
                    {linkContent}
                </small>
            );

        case 'h2':
        case 'h3':
        case 'h4':
            return (
                <small className="block font-normal leading-none tracking-normal text-sm md:text-base italic">
                    {linkContent}
                </small>
            );
    }
};

export default HeadlineKicker;
