import type { ReactElement } from 'react';
import RichText from '@/components/Blocks/RichText';
import { PayloadImage } from '@/components/common/Image';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { MediaBlogProps } from '@/types/payload/Blocks';

export const MediaBlock = ({ media, caption, size }: MediaBlogProps): ReactElement => {

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
