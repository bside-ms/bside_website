import type { ReactElement } from 'react';
import type { BlockLayoutProps } from '@/types/payload/Blocks';
import type { Circle, Event } from '@/types/payload/payload-types';
import CallToActionBlock from '@blocks/callToActionBlock/CallToActionBlock';
import CircleOverviewBlock from '@blocks/circleOverviewBlock/CircleOverviewBlock';
import EventOverviewBlock from '@blocks/eventOverviewBlock/EventOverviewBlock';
import HeadlineBlock from '@blocks/headlineBlock/HeadlineBlock';
import MediaBlock from '@blocks/mediaBlock/MediaBlock';
import MediaContentBlock from '@blocks/mediaContent/MediaContentBlock';
import TeaserBlock from '@blocks/teaserBlock/TeaserBlock';
import ContentBlock from '@blocks/textBlock/ContentBlock';

export interface ReusableBlockProps {
    layoutElement: NonNullable<BlockLayoutProps['blocks']>[0];
    circles?: Array<Circle> | null;
    events?: Array<Event> | null;
    previousBlock?: string;
    nextBlock?: string;
}

const ReusableBlocks = ({ layoutElement, circles = null, events = null, previousBlock, nextBlock }: ReusableBlockProps): ReactElement | null => {

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
                    effects={layoutElement.effects}
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
                    previousBlock={previousBlock}
                    effects={layoutElement.effects}
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
                    as={layoutElement.as}
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

        case 'eventOverview':
            return events === null ? (<div />) : (
                <EventOverviewBlock
                    headlineText={layoutElement.title}
                    events={events}
                    richText={layoutElement.richText}
                />
            );

        case 'teaser':
            return (
                <TeaserBlock
                    headlineTitle={layoutElement.headlineTitle}
                    headlineTeaser={layoutElement.headlineTeaser ?? ''}
                    text={layoutElement.richText}
                    image={layoutElement.image}
                    reversed={layoutElement.reversed ?? false}
                    linkText={layoutElement.linkText}
                    linkHref={layoutElement.linkHref}
                    previousBlock={previousBlock}
                    nextBlock={nextBlock}
                />
            );

        default:
            return null;
    }
};

export default ReusableBlocks;
