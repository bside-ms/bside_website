import type { ReactElement } from 'react';
import type { BlockLayoutProps } from '@/types/payload/Blocks';
import { CallToActionBlock } from '@blocks/CallToActionBlock';
import { HeadlineBlock } from '@blocks/HeadlineBlock';
import { MediaBlock } from '@blocks/MediaBlock';
import { MediaContentBlock } from '@blocks/MediaContent';
import { ContentBlock } from '@blocks/TextBlock';

interface Props {
    layoutElement: NonNullable<BlockLayoutProps['blocks']>[0];
}

const ReusableBlocks = ({ layoutElement }: Props): ReactElement | null => {

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