import type { ReactElement } from 'react';
import type { BlockLayoutProps } from '@/types/payload/Blocks';
import type { Circle } from '@/types/payload/payload-types';
import CircleOverviewBlock from '@blocks/circleOverviewBlock/CircleOverviewBlock';
import CallToActionBlock from 'components/blocks/callToActionBlock/CallToActionBlock';
import HeadlineBlock from 'components/blocks/headlineBlock/HeadlineBlock';
import MediaBlock from 'components/blocks/mediaBlock/MediaBlock';
import MediaContentBlock from 'components/blocks/mediaContent/MediaContentBlock';
import ContentBlock from 'components/blocks/textBlock/ContentBlock';

interface Props {
    layoutElement: NonNullable<BlockLayoutProps['blocks']>[0];
    circles?: Array<Circle> | null;
}

const ReusableBlocks = ({ layoutElement, circles = null }: Props): ReactElement | null => {

    switch (layoutElement.blockType) {
        case 'callToAction':
            return (
                <CallToActionBlock
                    title={layoutElement.title}
                    text={layoutElement.text}
                    href={layoutElement.href}
                />
            );

        case 'content':
            return (
                <ContentBlock
                    columns={layoutElement.columns}
                    backgroundColor={layoutElement.backgroundColor}
                    backgroundWidth={layoutElement.backgroundWidth}
                />
            );

        case 'mediaBlock':
            return (
                <MediaBlock
                    media={layoutElement.media}
                    size={layoutElement.size}
                    caption={layoutElement.caption}
                />
            );

        case 'mediaContent':
            return (
                <MediaContentBlock
                    media={layoutElement.media}
                    richText={layoutElement.richText}
                    alignment={layoutElement.alignment}
                    headline={layoutElement.headline}
                    backgroundColor={layoutElement.backgroundColor}
                />
            );

        case 'headlineBlock':
            return (
                <HeadlineBlock
                    title={layoutElement.title}
                    anchor={layoutElement.anchor}
                    teaser={layoutElement.teaser}
                    level={layoutElement.level}
                    backgroundColor={layoutElement.backgroundColor}
                />
            );

        case 'circleOverview':
            return circles === null ? (<div />) : (
                <CircleOverviewBlock
                    headlineText={layoutElement.title}
                    circles={circles}
                    richText={layoutElement.richText}
                />
            );

        default:
            // @ts-expect-error | This is just in case, it shouldn't happen.
            // eslint-disable-next-line no-console
            console.warn(`Received unexpected block type "${layoutElement.blockType}"`);

            return null;
    }
};

export default ReusableBlocks;