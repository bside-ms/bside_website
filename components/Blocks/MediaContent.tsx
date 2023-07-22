import type { ReactElement } from 'react';
import RichText from '@/components/Blocks/RichText';
import { PayloadImage } from '@/components/common/Image';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { MediaContentBlockProps } from '@/types/payload/Blocks';

const MediaContent = ({ media, richText, alignment }: MediaContentBlockProps): ReactElement => {

    return (
        <ContentWrapper px={false}>
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
        </ContentWrapper>
    );
};

export const MediaContentBlock = (props: MediaContentBlockProps): ReactElement => {
    return (
        (props.backgroundColor === 'black' ? (
            <div className="flex-grow">
                <div className="bg-black text-white">
                    <MediaContent media={props.media} richText={props.richText} alignment={props.alignment} />
                </div>
            </div>
        ) : (
            <MediaContent media={props.media} richText={props.richText} alignment={props.alignment} />
        ))
    );
};
