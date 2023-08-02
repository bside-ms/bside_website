import type { ReactElement } from 'react';
import { PayloadImage } from '@/components/common/Image';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { SlateChildren } from '@/types/payload/Blocks';
import type { Media } from '@/types/payload/payload-types';
import type { MediaContentAlignment } from '@blocks/MediaContent';
import { RichText } from '@blocks/RichTextBlock';

interface Props {
    media: Media;
    richText: SlateChildren;
    alignment: MediaContentAlignment;
}

const MediaContent = ({ media, richText, alignment }: Props): ReactElement => {

    const payloadImageElement = <PayloadImage resource={media} />;
    const richTextElement = <RichText content={richText} />;

    const elements = alignment === 'contentOnRight'
        ? [payloadImageElement, richTextElement] as const
        : [richTextElement, payloadImageElement] as const;

    return (
        <ContentWrapper>
            <div className="grid grid-cols-12 gap-4">
                <div className="my-auto col-span-12 md:col-span-6">
                    {elements[0]}
                </div>
                <div className="my-auto col-span-12 md:col-span-6">
                    {elements[1]}
                </div>
            </div>
        </ContentWrapper>
    );
};

export default MediaContent;
