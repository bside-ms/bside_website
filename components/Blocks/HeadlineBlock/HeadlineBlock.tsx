import type { ReactElement } from 'react';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { HeadlineBlockProps } from '@/types/payload/Blocks';
import { Headline } from '@blocks/HeadlineBlock';

const HeadlineBlock = (props: HeadlineBlockProps): ReactElement => {

    return (
        <ContentWrapper className="pt-4 !pb-0 !-mb-2">
            <Headline
                title={props.title}
                anchor={props.anchor}
                teaser={props.teaser}
                level={props.level}
            />
        </ContentWrapper>
    );
};

export default HeadlineBlock;