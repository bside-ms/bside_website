import type { ReactElement } from 'react';
import type { HeadlineLevel } from '@/components/Blocks/headline/Headline';

interface Props {
    level: HeadlineLevel;
    children: string;
}

const HeadlineKicker = ({ children, level }: Props): ReactElement => {

    const content = (
        <>
            {/* eslint-disable-next-line react/no-danger */}
            <span dangerouslySetInnerHTML={{ __html: children }} />
            <span className="sr-only">:</span>
        </>
    );

    switch (level) {
        case 'h1':
            return (
                <small className="block font-normal leading-none tracking-normal italic text-base md:text-base mb-1">
                    {content}
                </small>
            );

        case 'h2':
        case 'h3':
        case 'h4':
            return (
                <small className="block font-normal leading-none tracking-normal text-sm md:text-base italic">
                    {content}
                </small>
            );
    }
};

export default HeadlineKicker;
