import { Fragment } from 'react';
import type { ReactElement } from 'react';
import { CallToActionBlock } from '@/components/Blocks/CallToAction';
import { ContentBlock } from '@/components/Blocks/Content';
import { HeadlineBlock } from '@/components/Blocks/Headline';
import { MediaBlock } from '@/components/Blocks/MediaBlock';
import { MediaContentBlock } from '@/components/Blocks/MediaContent';
import type { BlockLayoutProps } from '@/types/payload/Blocks';

const blockComponents = {
    content: ContentBlock,
    mediaContent: MediaContentBlock,
    mediaBlock: MediaBlock,
    callToAction: CallToActionBlock,
    headlineBlock: HeadlineBlock,
};

export const RenderBlocks = ({ blocks }: BlockLayoutProps): ReactElement => {
    const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

    if (!hasBlocks) {
        return (<div />);
    }

    return (
        <Fragment>
            {blocks.map((block, index) => {
                const {
                    blockName,
                    blockType,
                } = block;

                if (blockType in blockComponents) {
                    const BlockType = blockComponents[blockType];

                    return (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        <BlockType
                            id={blockName ?? `block-${index}`}
                            key={blockName ?? `block-${index}`}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...block}
                        />
                    );
                }
                return null;
            })}
        </Fragment>
    );
};
