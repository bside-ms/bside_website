import { Fragment } from 'react';
import type React from 'react';
import { ContentBlock } from '@/components/Blocks/Content';
import type { Circle } from '@/types/payload/payload-types';

const blockComponents = {
    content: ContentBlock,
};

const Blocks: React.FC<{
    blocks: Circle['layout'];
}> = (props) => {
    const { blocks } = props;

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;
    if (hasBlocks === false || blocks === undefined) {
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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const Block = blockComponents[blockType];

                    return (
                        <Block
                            id={blockName}
                            key={blockName}
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

export default Blocks;
