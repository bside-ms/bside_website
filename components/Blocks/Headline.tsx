import type { ReactElement } from 'react';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { HeadlineBlockProps } from '@/types/payload/Blocks';

const Headline = ({ title, anchor }: HeadlineBlockProps): ReactElement => {
    return (

        <ContentWrapper>
            <div
                id={anchor}
                key={`headline-${anchor}`}
                className="font-bold font-serif text-2xl md:text-4xl md:scroll-mt-[64px]"
            >
                {title}
            </div>
        </ContentWrapper>

    );
};

export const HeadlineBlock = (props: HeadlineBlockProps): ReactElement => {
    return (
        <Headline
            title={props.title}
            anchor={props.anchor}
        />
    );
};
