import type { ReactElement } from 'react';
import RichText from '@/components/Blocks/RichText';
import { PayloadImage } from '@/components/common/Image';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { MediaBlockProps } from '@/types/payload/Blocks';

export const MediaBlock = ({ media, caption, size }: MediaBlockProps): ReactElement => {

    return (
        <ContentWrapper px={false}>
            <PayloadImage
                resource={media}
                imgClassName={size}
            />
            {caption && (
                <div>
                    { /* ToDo: Small does not apply for the RichText-Field */ }
                    <small>
                        <RichText content={caption} />
                    </small>
                </div>
            )}
        </ContentWrapper>
    );
};
