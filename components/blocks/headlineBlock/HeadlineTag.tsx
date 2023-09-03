import type { ReactElement, ReactNode } from 'react';
import getHeadlineId from '@/lib/block/getHeadlineId';
import type { HeadlineLevel } from '@blocks/headlineBlock/Headline';

interface Props {
    level: HeadlineLevel;
    anchor?: string | null;
    children: ReactNode;
}

const HeadlineTag = ({ children, level, anchor }: Props): ReactElement => {

    const id = getHeadlineId(anchor, children);

    switch (level) {
        case 'h1':
            return (
                <h1 id={id} className="font-serif leading-none text-3xl md:text-4xl break-words sm:break-normal">
                    {children}
                </h1>
            );

        case 'h2':
            return (
                <h2 id={id} className="font-serif leading-tight text-2xl md:text-3xl break-words sm:break-normal">
                    {children}
                </h2>
            );

        case 'h3':
            return (
                <h3 id={id} className="font-serif leading-tight text-xl md:text-2xl break-words sm:break-normal">
                    {children}
                </h3>
            );

        case 'h4':
            return (
                <h4 id={id} className="font-serif leading-tight text-xl md:text-xl font-bold">
                    {children}
                </h4>
            );
    }
};

export default HeadlineTag;
