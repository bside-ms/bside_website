import { Fragment } from 'react';
import type { ReactElement } from 'react';
import { ContentBlock } from '@/components/Blocks/Content';
import { MediaContentBlock } from '@/components/Blocks/MediaContent';
import { toKebabCase } from '@/lib/common/toKebabCase';
import type { BlockLayoutProps } from '@/types/payload/Blocks';

const blockComponents = {
    content: ContentBlock,
    mediaContent: MediaContentBlock,
};

export const RenderBlocks = ({ blocks }: BlockLayoutProps): ReactElement => {
    const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

    if (!hasBlocks) {
        return (<div />);
    }

    return (
        <Fragment>
            {blocks.map((block) => {
                const {
                    blockName,
                    blockType,
                } = block;

                if (blockType in blockComponents) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const BlockType = blockComponents[blockType];

                    return (
                        <BlockType
                            id={toKebabCase(blockName!)}
                            key={blockName!}
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
