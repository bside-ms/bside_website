import type { ReactElement } from 'react';
import type EventsOnPage from '@/types/EventsOnPage';
import type { BlockLayoutProps } from '@/types/payload/Blocks';
import type { Circle } from '@/types/payload/payload-types';
import CallToActionBlock from '@blocks/callToActionBlock/CallToActionBlock';
import CircleOverviewBlock from '@blocks/circleOverviewBlock/CircleOverviewBlock';
import EventsOverviewBlock from '@blocks/eventOverviewBlock/EventsOverviewBlock';
import HeadlineBlock from '@blocks/headlineBlock/HeadlineBlock';
import MediaBlock from '@blocks/mediaBlock/MediaBlock';
import MediaContentBlock from '@blocks/mediaContent/MediaContentBlock';
import SliderBlock from '@blocks/sliderBlock/SliderBlock';
import TeaserBlock from '@blocks/teaserBlock/TeaserBlock';
import ContentBlock from '@blocks/textBlock/ContentBlock';

interface Props {
    circles?: Array<Circle> | null;
    layoutElement: NonNullable<BlockLayoutProps['blocks']>[0];
    nextBlock?: string;
    previousBlock?: string;
    eventsOnPage?: EventsOnPage;
}

const ReusableTeaserBlock = ({ layoutElement, previousBlock, nextBlock }: Omit<ReusableBlockProps, 'circles' | 'events'>): ReactElement | null => {
    if (layoutElement.blockType !== 'teaser') {
        return null;
    }

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
};

const ReusableBlocks = ({ layoutElement, circles = null, previousBlock, nextBlock, eventsOnPage }: Props): ReactElement | null => {

    switch (layoutElement.blockType) {
        case 'callToAction':
            return (
                <CallToActionBlock
                    title={layoutElement.title!}
                    text={layoutElement.text}
                    href={layoutElement.href}
                />
            );

        case 'content':
            return (
                <ContentBlock
                    columns={layoutElement.columns ?? []}
                    backgroundColor={layoutElement.backgroundColor}
                    backgroundWidth={layoutElement.backgroundWidth}
                />
            );

        case 'mediaBlock':
            return (
                <MediaBlock
                    media={layoutElement.media}
                    size={layoutElement.size!}
                    caption={layoutElement.caption!}
                    effects={layoutElement.effects!}
                />
            );

        case 'mediaContent':
            return (
                <MediaContentBlock
                    media={layoutElement.media}
                    richText={layoutElement.richText}
                    alignment={layoutElement.alignment}
                    headline={layoutElement.headline!}
                    backgroundColor={layoutElement.backgroundColor}
                    effects={layoutElement.effects!}
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
                    previousBlock={previousBlock}
                    nextBlock={nextBlock}
                />
            );

        case 'circleOverview':
            return (
                <CircleOverviewBlock
                    headlineText={layoutElement.title}
                    circles={circles ?? []}
                    richText={layoutElement.richText}
                />
            );

        case 'eventOverview':
            return (
                <EventsOverviewBlock
                    headlineText={layoutElement.title}
                    richText={layoutElement.richText}
                    eventsOnPage={eventsOnPage}
                />
            );

        case 'teaser':
            return <ReusableTeaserBlock layoutElement={layoutElement} previousBlock={previousBlock} nextBlock={nextBlock} />;

        case 'slider':
            return <SliderBlock imageSlides={layoutElement.imageSlides ?? []} />;

        default:
            return null;
    }
};

export default ReusableBlocks;
