import { Fragment } from 'react';
import type React from 'react';
import { ContentBlock } from '@/components/Blocks/Content';
import { toKebabCase } from '@/lib/common/toKebabCase';
import type { Circle } from '@/types/payload/payload-types';

const blockComponents = {
    content: ContentBlock,
};

interface Props {
    blocks: Circle['layout'];
}

export const RenderBlocks: React.FC<Props> = props => {
    const { blocks } = props;
    const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

    if (!hasBlocks) {
        return null;
    }

    return (
        <Fragment>
            {blocks.map((block) => {
                const {
                    blockName,
                    blockType,
                } = block;

                if (blockType in blockComponents) {
                    // eslint-disable-next-line ,@typescript-eslint/ban-ts-comment,@typescript-eslint/ban-ts-comment
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
