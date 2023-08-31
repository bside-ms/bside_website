import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import getHeadlineId from '@/lib/block/getHeadlineId';
import type { Organisation } from '@/types/payload/payload-types';
import SubNavigationLink from '@blocks/subNavigation/SubNavigationLink';

interface Props {
    pageLayout: Organisation['layout'];
}

const SubNavigation = ({ pageLayout }: Props): ReactElement | null => {

    const elements = pageLayout
        ?.map(block => {

            if (block.blockType === 'circleOverview') {
                return (
                    <SubNavigationLink
                        key={block.title}
                        anchor={getHeadlineId(null, block.title)}
                        title={block.title}
                    />
                );
            }

            if (block.blockType === 'headlineBlock') {
                return (
                    <SubNavigationLink
                        key={block.title}
                        anchor={getHeadlineId(block.anchor, block.title)}
                        teaser={block.teaser}
                        title={block.title}
                    />
                );
            }

            if (block.blockType === 'teaser') {
                return (
                    <SubNavigationLink
                        key={block.headlineTitle}
                        anchor={getHeadlineId(null, block.headlineTitle)}
                        teaser={block.headlineTeaser}
                        title={block.headlineTitle}
                    />
                );
            }

            if (block.blockType === 'eventOverview') {
                return (
                    <SubNavigationLink
                        key={block.title}
                        anchor={getHeadlineId(null, block.title)}
                        title={block.title}
                    />
                );
            }

            return null;
        })
        .filter(element => element !== null) ?? [];

    if (elements.length === 0) {
        return null;
    }

    return (
        <ContentWrapper>
            <div className="font-serif text-white bg-black text-lg p-3 flex flex-col">
                {elements}
            </div>
        </ContentWrapper>
    );
};

export default SubNavigation;
