import Link from 'next/link';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { HeadlineLevel } from '@blocks/headlineBlock/Headline';

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
                <Link href={link} className="hover:font-bold hover:text-orange-500">
                    {content}
                </Link>
            )}

            {isEmptyString(link) && <>{content}</>}
        </>
    );

    switch (level) {
        case 'h1':
            return (
                <small className="mb-1 block text-base font-normal italic leading-none tracking-normal md:text-base">
                    {linkContent}
                </small>
            );

        case 'h2':
        case 'h3':
        case 'h4':
            return (
                <small className="block text-base font-normal italic leading-none tracking-normal md:text-base">
                    {linkContent}
                </small>
            );
    }
};

export default HeadlineKicker;
