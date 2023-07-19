import { Fragment } from 'react';
import type { ReactElement } from 'react';
import RichText from '@/components/Blocks/RichText';
import { PayloadImage } from '@/components/common/Image';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { MediaContentBlockProps } from '@/types/payload/Blocks';

export const MediaContentBlock = ({ media, richText, alignment }: MediaContentBlockProps): ReactElement => {

    return (
        <Fragment>
            {alignment === 'contentOnRight' ? (
                <div className="grid grid-cols-12 gap-4">
                    <div className="my-auto col-span-12 md:col-span-6">
                        <PayloadImage resource={media} />
                    </div>
                    <div className="my-auto col-span-12 md:col-span-6">
                        <RichText content={richText} />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-12 gap-4">
                    <div className="my-auto col-span-12 md:col-span-6">
                        <RichText content={richText} />
                    </div>
                    <div className="my-auto col-span-12 md:col-span-6">
                        <PayloadImage resource={media} />
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export const MediaContent = (props: MediaContentBlockProps): ReactElement => {
    return (
        <ContentWrapper px={false}>
            <MediaContentBlock media={props.media} richText={props.richText} alignment={props.alignment} />
        </ContentWrapper>
    );
};
