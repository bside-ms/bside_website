import Image from 'next/image';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { MediaBlockProps } from '@/types/payload/Blocks';

export const MediaBlock = ({ media, caption = '', size }: MediaBlockProps): ReactElement => {

    return (
        <ContentWrapper>
            <div className="relative">
                <Image
                    src={media.url!}
                    alt={media.alt}
                    width={media.width}
                    height={media.height}
                    className="mx-auto"
                />

                {!isEmptyString(caption) && (
                    <div className="text-center text-sm md:text-base mt-1 md:mt-2 italic">
                        <p className="mx-auto">{caption} Size: {size}</p>
                    </div>
                )}
            </div>
        </ContentWrapper>
    );
};
