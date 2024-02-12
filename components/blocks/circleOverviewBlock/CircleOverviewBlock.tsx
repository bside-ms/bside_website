import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import type { SlateChildren } from '@/types/payload/Blocks';
import type { Circle } from '@/types/payload/payload-types';
import CircleOverview from '@blocks/circleOverviewBlock/CircleOverview';

interface Props {
    headlineText: string;
    circles: Array<Circle>;
    richText: SlateChildren;
}

const CircleOverviewBlock = ({ headlineText, circles, richText }: Props): ReactElement => {

    return (
        <ContentWrapper>
            <CircleOverview
                headlineText={headlineText}
                circles={circles}
                richText={richText}
            />
        </ContentWrapper>
    );
};

export default CircleOverviewBlock;
