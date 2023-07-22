import type { ReactElement } from 'react';
import { PayloadImage } from '@/components/common/Image';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { MediaBlockProps } from '@/types/payload/Blocks';

export const MediaBlock = ({ media, caption = '', size }: MediaBlockProps): ReactElement => {

    return (
        <ContentWrapper px={false}>
            <PayloadImage
                resource={media}
                imgClassName={size}
            />
            {!isEmptyString(caption) && (
                <div>
                    <small>
                        <p>{caption}</p>
                    </small>
                </div>
            )}
        </ContentWrapper>
    );
};
