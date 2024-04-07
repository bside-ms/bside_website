import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import type { HeadlineBlockProps } from '@/types/payload/Blocks';
import Headline from 'components/blocks/headlineBlock/Headline';

const HeadlineBlock = (props: HeadlineBlockProps): ReactElement => {
    if (props.backgroundColor === 'black') {
        return (
            <div className="flex-grow">
                <div className="bg-black text-white">
                    <ContentWrapper className="!-mb-2 !pb-0 pt-4">
                        <Headline
                            title={props.title}
                            anchor={props.anchor}
                            teaser={props.teaser}
                            level={props.level}
                            as={props.as}
                        />
                    </ContentWrapper>
                </div>
            </div>
        );
    }

    return (
        <ContentWrapper className="!-mb-2 !pb-0 pt-4">
            <Headline
                title={props.title}
                anchor={props.anchor}
                teaser={props.teaser}
                level={props.level}
                as={props.as}
            />
        </ContentWrapper>
    );
};

export default HeadlineBlock;
