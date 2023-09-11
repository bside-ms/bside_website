import type { ReactElement } from 'react';
import { PayloadImage } from '@/components/common/Image';
import ContentWrapper from '@/components/layout/ContentWrapper';
import type { SlateChildren } from '@/types/payload/Blocks';
import type { Media } from '@/types/payload/payload-types';
import type { MediaContentAlignment } from '@blocks/mediaContent/MediaContentBlock';
import RichText from 'components/blocks/richTextBlock/RichText';

interface Props {
    media: Media;
    richText: SlateChildren;
    alignment: MediaContentAlignment;
    effects: Array<'blur' | 'grayscale' | 'desaturated' | 'darker'>;
}

const MediaContent = ({ media, richText, alignment, effects }: Props): ReactElement => {

    const payloadImageElement = <PayloadImage resource={media} effects={effects} />;
    const richTextElement = <RichText content={richText} />;

    const elements = alignment === 'contentOnRight'
        ? [payloadImageElement, richTextElement] as const
        : [richTextElement, payloadImageElement] as const;

    return (
        <ContentWrapper>
            <div className="grid grid-cols-12 gap-4">
                <div className="my-auto col-span-12 md:col-span-6 mx-auto md:mx-0">
                    {elements[0]}
                </div>
                <div className="my-auto col-span-12 md:col-span-6 mx-auto md:mx-0">
                    {elements[1]}
                </div>
            </div>
        </ContentWrapper>
    );
};

export default MediaContent;
